import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

import { GitMetadata } from './git.metadata';
import { Logger } from './log';
import { AssetMetadata, DEFAULT_THEME, ExtensionMetadata, PackageInfo, Packages, ThemingMetadata } from './packages';

/**
 * Represents the stratos.yaml file or the defaults if not found
 *
 * Also includes related config such as node_modules dirpath and angular.json file path
 */

export class StratosConfig implements Logger {

  // File paths to a few files we need access to
  public packageJsonFile: string;
  public nodeModulesFile: string;
  public angularJsonFile: string;

  public rootDir: string;

  // angular.json contents
  public angularJson: any;

  // package.json contents
  public packageJson: any;

  // newProjectRoot from the angular.json file
  // Used as the directory to check for local packages
  public newProjectRoot: string;

  // Stratos config file
  public stratosConfig: any;

  // Git Metadata
  public gitMetadata: GitMetadata;

  private loggingEnabled = true;

  private packages: Packages;

  constructor(dir: string, options?: any, loggingEnabled = true) {
    this.angularJsonFile = this.findFileOrFolderInChain(dir, 'angular.json');
    this.angularJson = JSON.parse(fs.readFileSync(this.angularJsonFile, 'utf8').toString());
    this.loggingEnabled = loggingEnabled;

    // Top-level folder
    this.rootDir = path.dirname(this.angularJsonFile);

    // The Stratos config file is optional - allows overriding default behaviour
    this.stratosConfig = {};
    if (this.angularJsonFile) {
      // Read stratos.yaml if we can
      const stratosYamlFile = path.join(path.dirname(this.angularJsonFile), 'stratos.yaml');
      if (fs.existsSync(stratosYamlFile)) {
        try {
          this.stratosConfig = yaml.safeLoad(fs.readFileSync(stratosYamlFile, 'utf8'));
          // this.log(this.stratosConfig);
          this.log('Read stratos.yaml okay from: ' + stratosYamlFile);
        } catch (e) {
          this.log(e);
        }
      } else {
        this.log('Using default configuration');
      }
    }

    // Exclude the default packages... unless explicity `include`d
    this.excludeExamples()

    this.packageJsonFile = this.findFileOrFolderInChain(this.rootDir, 'package.json');
    if (this.packageJsonFile !== null) {
      this.packageJson = JSON.parse(fs.readFileSync(this.packageJsonFile, 'utf8').toString());
    }

    this.nodeModulesFile = this.findFileOrFolderInChain(this.rootDir, 'node_modules');

    this.gitMetadata = new GitMetadata(this.rootDir);
    // this.log(this.gitMetadata);
    if (this.gitMetadata.exists) {
      this.log('Read git metadata file');
    }

    this.newProjectRoot = path.join(this.rootDir, this.angularJson.newProjectRoot);

    // Discover all packages

    // Helper to discover and interpret packages
    this.packages = new Packages(this, this.nodeModulesFile, this.newProjectRoot);
    this.packages.setLogger(this);
    this.packages.scan(this.packageJson);

    this.log('Using theme ' + this.packages.theme.name);

    const extensions = this.getExtensions();

    if (extensions.length === 0) {
      this.log('Building without any extensions');
    } else {
      this.log('Building with these extensions:');
      extensions.forEach(ext => this.log(` + ${ext.package}`));
    }
  }

  private excludeExamples() {
    const examplePackages = ['@example/theme', '@example/extensions']
    const exclude = [];
    // Are examples explicitly in the include section?
    if (this.stratosConfig &&
      this.stratosConfig.packages &&
      this.stratosConfig.packages.include &&
      this.stratosConfig.packages.include.length > 0 // Will check if this is an array
    ) {
      examplePackages.forEach(ep => this.addIfMissing(this.stratosConfig.packages.include, ep, exclude))
    } else {
      exclude.push(...examplePackages);
    }

    // No op
    if (exclude.length < 1) {
      return;
    }

    // If examples are not in include section, add them to the exclude
    if (!this.stratosConfig) {
      this.stratosConfig = {}
    }
    if (!this.stratosConfig.packages) {
      this.stratosConfig.packages = {}
    }
    if (!this.stratosConfig.packages.exclude) {
      this.stratosConfig.packages.exclude = [];
    }
    exclude.forEach(e => this.addIfMissing(this.stratosConfig.packages.exclude, e));
  }

  private addIfMissing<T = string>(array: T[], entry: T, dest: T[] = array) {
    if (array.indexOf(entry) < 0) {
      dest.push(entry)
    }
  }

  public log(msg: any) {
    if (this.loggingEnabled) {
      console.log(msg);
    }
  }

  public getTheme(): PackageInfo {
    return this.packages.theme;
  }

  public getDefaultTheme(): PackageInfo {
    return this.packages.packageMap[DEFAULT_THEME];
  }

  public getExtensions(): ExtensionMetadata[] {
    return this.packages.packages.filter(p => !!p.extension).map(pkg => pkg.extension);
  }

  public getAssets(): AssetMetadata[] {
    const assets: AssetMetadata[] = [];
    this.packages.packages.forEach(pkg => {
      if (pkg.assets) {
        assets.push(...pkg.assets);
      }
    });

    return assets;
  }

  public getThemedPackages(): ThemingMetadata[] {
    return this.packages.packages.filter(p => !!p.theming).map(pkg => pkg.theming);
  }

  public getPackageJsonFolder() {
    return path.dirname(this.packageJsonFile);
  }

  public getNodeModulesFolder() {
    return path.dirname(this.nodeModulesFile);
  }

  // Go up the directory hierarchy and look for the named file or folder
  private findFileOrFolderInChain(dir: string, name: string): string {
    const parent = path.dirname(dir);
    const itemPath = path.join(dir, name);
    if (fs.existsSync(itemPath)) {
      return itemPath;
    }

    if (parent === dir) {
      return null;
    }

    return this.findFileOrFolderInChain(parent, name);
  }

  // Resolve a known package or return null if not a known package
  public resolveKnownPackage(pkg: string): string {
    const p = this.packages.packageMap[pkg];
    if (p) {
      let packagePath = p.dir;
      if (!path.isAbsolute(packagePath)) {
        packagePath = path.resolve(packagePath);
      }
      return packagePath;
    }

    return null;
  }

  // Resolve a package to a directory to a file path, if name is given
  public resolvePackage(pkg: string, name?: string) {
    let packagePath;
    const pkgInfo = this.packages.packageMap[pkg];
    if (pkgInfo) {
      packagePath = pkgInfo.dir;
    } else {
      // Default to getting the package from the node_modules folder
      packagePath = path.join(this.getNodeModulesFolder(), pkg);
    }

    if (!path.isAbsolute(packagePath)) {
      packagePath = path.resolve(packagePath);
    }

    if (name) {
      packagePath = path.join(packagePath, name);
    }
    return packagePath;
  }
}
