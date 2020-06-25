# Stratos

<a href="https://travis-ci.com/suse/stratos/branches"><img src="https://travis-ci.com/suse/stratos.svg?branch=master"></a>&nbsp;<a style="padding-left: 4px" href="https://codeclimate.com/github/suse/stratos/maintainability"><img src="https://api.codeclimate.com/v1/badges/61af8b605f385e894632/maintainability" /></a>
<a href="https://goreportcard.com/report/github.com/suse/stratos"><img src="https://goreportcard.com/badge/github.com/suse/stratos"/></a>
<a href="https://codecov.io/gh/suse/stratos/branch/master"><img src="https://codecov.io/gh/suse/stratos/branch/master/graph/badge.svg"/></a>
[![GitHub release](https://img.shields.io/github/release/suse/stratos.svg)](https://github.com/suse/stratos/releases/latest)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/suse/stratos/blob/master/LICENSE)
[![slack.cloudfoundry.org](https://slack.cloudfoundry.org/badge.svg)](https://cloudfoundry.slack.com/messages/C80EP4Y57/)

Stratos is an Open Source Web-based UI (Console) for managing Cloud Foundry. It allows users and administrators to both manage applications running in the Cloud Foundry cluster and perform cluster management tasks.

If you are looking for a version of Stratos, you can find ..
- V1 in the [v1-master](https://github.com/suse/stratos/tree/v1-master) branch.
- V2 in the [v2-master](https://github.com/suse/stratos/tree/v2-master) branch.

![Stratos Application view](docs/images/screenshots/app-summary.png)

## Quick Start

To get started quickly, we recommend following the steps to deploy the Stratos Console as a Cloud Foundry Application - see [here](deploy/cloud-foundry).

If you have [docker](https://www.docker.com/community-edition) installed, you can quickly deploy Stratos using the all-in-one container:
```
$ docker run -p 4443:443 splatform/stratos:latest 
```

Once that has finished, you can then access Stratos by visiting https://localhost:4443.

## Deploying Stratos

Stratos can be deployed in the following environments:

1. Cloud Foundry, as an application. See [guide](deploy/cloud-foundry)
2. Kubernetes, using a Helm chart. See [guide](deploy/kubernetes)
3. Docker, single container deploying all components. See [guide](deploy/all-in-one)

## Troubleshooting

Please see our [Troubleshooting](docs/troubleshooting) page.

## Further Reading
 
Take a look at the [Feature Set](docs/features.md) for details on the feature set that Stratos provides.
 
Get an [Overview](docs/overview.md) of Stratos, its components and the different ways in which it can be deployed.

Take a look at the [Development Roadmap](docs/roadmap.md) to see where we are heading. We update our status page each week to summarize what we are working on - see the [Status Page](docs/status_updates.md).

Browse through features and issues in the project's [issues](https://github.com/suse/stratos/issues) page.

What kind of code is in Stratos? We've integrated [Code Climate](https://codeclimate.com) for some code quality and maintainability metrics. Take a stroll around the [project page](https://codeclimate.com/github/SUSE/stratos)

## Contributing

We very much welcome developers who would like to get involved and contribute to the development of the Stratos project. Please refer to the [Contributing guide](CONTRIBUTING.md) for more information.

For information to help getting started with development, please read the [Developer's Guide](docs/developers-guide.md).

## Support and feedback

We have a channel (#stratos) on the Cloud Foundy Slack where you can ask questions, get support or give us feedback. We'd love to hear from you if you are using Stratos.

You can join the Cloud Foundry Slack here - https://slack.cloudfoundry.org/  - and then join the #stratos channel.

## Acknowledgements

Tested with Browserstack

<a href="https://www.browserstack.com"><img width="240px" src="docs/images/Browserstack-logo.svg" alt="Browserstack"></a>

## License

The work done has been licensed under Apache License 2.0. The license file can be found [here](LICENSE).

      "dev": true,
      "requires": {
        "@types/estree": "0.0.39",
        "estree-walker": "^1.0.1",
        "micromatch": "^4.0.2"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-3.0.0.tgz",
          "integrity": "sha1-7QMXwyIGT3lGbAKWa922Bas32Zg="
        },
        "camelcase": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-4.1.0.tgz",
          "integrity": "sha1-1UVjW+HjPFQmScaRc+Xeas+uNN0="
        },
        "cliui": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/cliui/-/cliui-4.1.0.tgz",
          "integrity": "sha512-4FG+RSG9DL7uEwRUZXZn3SS34DiDPfzP0VOiEwtUWlE+AR2EIg+hSyvrIgUUfhdgR/UkAeW2QHgeP+hWrXs7jQ==",
          "requires": {
            "string-width": "^2.1.1",
            "strip-ansi": "^4.0.0"
          }
        },
        "invert-kv": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/invert-kv/-/invert-kv-2.0.0.tgz",
          "integrity": "sha512-wPVv/y/QQ/Uiirj/vh3oP+1Ww+AWehmi1g5fFWGPF6IpCBCDVrhgHRMvrLfdYcwDh3QJbGXDW4JAuzxElLSqKA=="
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8="
        },
        "lcid": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/lcid/-/lcid-2.0.0.tgz",
          "integrity": "sha512-avPEb8P8EGnwXKClwsNUgryVjllcRqtMYa49NTsbQagYuT1DcXnl1915oxWjoyGrXR6zH/Y0Zc96xWsPcoDKeA==",
          "requires": {
            "invert-kv": "^2.0.0"
          }
        },
        "mem": {
          "version": "4.3.0",
          "resolved": "https://registry.npmjs.org/mem/-/mem-4.3.0.tgz",
          "integrity": "sha512-qX2bG48pTqYRVmDB37rn/6PT7LcR8T7oAX3bf99u1Tt1nzxYfxkgqDwUwolPlXweM0XzBOBFzSx4kfp7KP1s/w==",
          "requires": {
            "map-age-cleaner": "^0.1.1",
            "mimic-fn": "^2.0.0"
          }
        },
        "micromatch": {
          "version": "4.0.2",
          "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.2.tgz",
          "integrity": "sha512-y7FpHSbMUMoyPbYUSzO6PaZ6FyRnQOpHuKwbo1G+Knck95XVU4QAiKdGEnj5wwoS7PlOgthX/09u5iFJ+aYf5Q==",
          "dev": true,
          "requires": {
            "braces": "^3.0.1",
            "picomatch": "^2.0.5"
          }
        },
        "os-locale": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/os-locale/-/os-locale-3.1.0.tgz",
          "integrity": "sha512-Z8l3R4wYWM40/52Z+S265okfFj8Kt2cC2MKY+xNi3kFs+XGI7WXu/I309QQQYbRW4ijiZ+yxs9pqEhJh0DqW3Q==",
          "requires": {
            "execa": "^1.0.0",
            "lcid": "^2.0.0",
            "mem": "^4.0.0"
          }
        },
        "string-width": {
          "version": "2.1.1",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-2.1.1.tgz",
          "integrity": "sha512-nOqH59deCq9SRHlxq1Aw85Jnt4w6KvLKqWVik6oA9ZklXLNIOlqg4F2yrT1MVaTjAqvVwdfeZ7w7aCvJD7ugkw==",
          "requires": {
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^4.0.0"
          }
        },
        "strip-ansi": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-4.0.0.tgz",
          "integrity": "sha1-qEeQIusaw2iocTibY1JixQXuNo8=",
          "requires": {
            "ansi-regex": "^3.0.0"
          }
        },
        "which-module": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.0.tgz",
          "integrity": "sha1-2e8H3Od7mQK4o6j6SzHD4/fm6Ho="
        },
        "y18n": {
          "version": "3.2.1",
          "resolved": "https://registry.npmjs.org/y18n/-/y18n-3.2.1.tgz",
          "integrity": "sha1-bRX7qITAhnnA136I53WegR4H+kE="
        },
        "yargs": {
          "version": "11.1.1",
          "resolved": "https://registry.npmjs.org/yargs/-/yargs-11.1.1.tgz",
          "integrity": "sha512-PRU7gJrJaXv3q3yQZ/+/X6KBswZiaQ+zOmdprZcouPYtQgvNU35i+68M4b1ZHLZtYFT5QObFLV+ZkmJYcwKdiw==",
          "requires": {
            "cliui": "^4.0.0",
            "decamelize": "^1.1.1",
            "find-up": "^2.1.0",
            "os-locale": "^3.1.0",
            "require-directory": "^2.1.1",
            "set-blocking": "^2.0.0",
            "string-width": "^2.0.0",
            "which-module": "^2.0.0",
            "y18n": "^3.2.1",
            "yargs-parser": "^9.0.2"
          },
          "dependencies": {
            "yargs-parser": {
              "version": "9.0.2",
              "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-9.0.2.tgz",
              "integrity": "sha1-nM9qQ0YP5O1Aqbto9I1DuKaMwHc=",
              "requires": {
                "camelcase": "^4.1.0"
              }
            }
          }
        },
        "yargs-parser": {
          "version": "10.0.0",
          "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-10.0.0.tgz",
          "integrity": "sha512-+DHejWujTVYeMHLff8U96rLc4uE4Emncoftvn5AjhB1Jw1pWxLzgBUT/WYbPrHmy6YPEBTZQx5myHhVcuuu64g==",
          "requires": {
            "camelcase": "^4.1.0"
          }
        }
      }
    },
    "@schematics/angular": {
      "version": "9.1.7",
      "resolved": "https://registry.npmjs.org/@schematics/angular/-/angular-9.1.7.tgz",
      "integrity": "sha512-ld3WcoMWvup04V3OWioQ+AFGQBzz7IDM4Fxc5+Qc3wILWkDJnNkrc4EmJAow96Ab4/T1+Wl1vof3tV4At0BTzA==",
      "dev": true,
      "requires": {
        "@angular-devkit/core": "9.1.7",
        "@angular-devkit/schematics": "9.1.7"
      }
    },
    "@schematics/update": {
      "version": "0.901.7",
      "resolved": "https://registry.npmjs.org/@schematics/update/-/update-0.901.7.tgz",
      "integrity": "sha512-6IpQVFvbu47CrXfqqHAzv2vi7AOdfi1S+SiayXU6FWTeA2wV47H8R60VjxurL8JkDGoVhFgC4+lK6KG++g3dQw==",
      "dev": true,
      "requires": {
        "@angular-devkit/core": "9.1.7",
        "@angular-devkit/schematics": "9.1.7",
        "@yarnpkg/lockfile": "1.1.0",
        "ini": "1.3.5",
        "npm-package-arg": "^8.0.0",
        "pacote": "9.5.12",
        "rxjs": "6.5.4",
        "semver": "7.1.3",
        "semver-intersect": "1.4.0"
      },
      "dependencies": {
        "rxjs": {
          "version": "6.5.4",
          "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-6.5.4.tgz",
          "integrity": "sha512-naMQXcgEo3csAEGvw/NydRA0fuS2nDZJiw1YUWFKU7aPPAPGZEsD4Iimit96qwCieH6y614MCLYwdkrWx7z/7Q==",
          "dev": true,
          "requires": {
            "tslib": "^1.9.0"
          }
        },
        "semver": {
          "version": "7.1.3",
          "resolved": "https://registry.npmjs.org/semver/-/semver-7.1.3.tgz",
          "integrity": "sha512-ekM0zfiA9SCBlsKa2X1hxyxiI4L3B6EbVJkkdgQXnSEEaHlGdvyodMruTiulSRWMMB4NeIuYNMC9rTKTz97GxA==",
          "dev": true
        }
      }
    },
    "@sindresorhus/is": {
      "version": "0.14.0",
      "resolved": "https://registry.npmjs.org/@sindresorhus/is/-/is-0.14.0.tgz",
      "integrity": "sha512-9NET910DNaIPngYnLLPeg+Ogzqsi9uM4mSboU5y6p8S5DzMTVEsJZrawi+BoDNUVBa2DhJqQYUFvMDfgU062LQ==",
      "dev": true
    },
    "@swimlane/ngx-charts": {
      "version": "13.0.4",
      "resolved": "https://registry.npmjs.org/@swimlane/ngx-charts/-/ngx-charts-13.0.4.tgz",
      "integrity": "sha512-4EvwclbctVQ5VzPBC63DJsg+jwQU/NlR/yQ9ObVH5acefEbS8kupn3cp/gaWftLTQ0jdXqRqycHNkLOQZfa3XQ==",
      "requires": {
        "d3-array": "^2.4.0",
        "d3-brush": "^1.1.5",
        "d3-color": "^1.4.0",
        "d3-format": "^1.4.2",
        "d3-hierarchy": "^1.1.9",
        "d3-interpolate": "^1.4.0",
        "d3-scale": "^3.2.1",
        "d3-selection": "^1.4.1",
        "d3-shape": "^1.3.7",
        "d3-time-format": "^2.2.2",
        "d3-transition": "^1.3.2"
      }
    },
    "@swimlane/ngx-graph": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/@swimlane/ngx-graph/-/ngx-graph-7.0.1.tgz",
      "integrity": "sha512-V85EuEJr61AM3J24slsiUkg6eak6J8IBy5zeD55fywLl3QbndRELRp3l/T2wu/HNpzyHzrC0/qpkEauqcHtRsA==",
      "requires": {
        "@swimlane/ngx-charts": "^13.0.1",
        "d3-dispatch": "^1.0.3",
        "d3-ease": "^1.0.5",
        "d3-force": "^1.1.0",
        "d3-selection": "^1.2.0",
        "d3-shape": "^1.2.0",
        "d3-timer": "^1.0.7",
        "d3-transition": "^1.1.1",
        "dagre": "^0.8.4",
        "transformation-matrix": "^1.15.3",
        "webcola": "^3.3.8"
      }
    },
    "@szmarczak/http-timer": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@szmarczak/http-timer/-/http-timer-1.1.2.tgz",
      "integrity": "sha512-XIB2XbzHTN6ieIjfIMV9hlVcfPU26s2vafYWQcZHWXHOxiaRZYEDKEwdl129Zyg50+foYV2jCgtrqSA6qNuNSA==",
      "dev": true,
      "requires": {
        "defer-to-connect": "^1.0.1"
      }
    },
    "@tootallnate/once": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/@tootallnate/once/-/once-1.0.0.tgz",
      "integrity": "sha512-KYyTT/T6ALPkIRd2Ge080X/BsXvy9O0hcWTtMWkPvwAwF99+vn6Dv4GzrFT/Nn1LePr+FFDbRXXlqmsy9lw2zA==",
      "dev": true
    },
    "@tweenjs/tween.js": {
      "version": "17.4.0",
      "resolved": "https://registry.npmjs.org/@tweenjs/tween.js/-/tween.js-17.4.0.tgz",
      "integrity": "sha512-J3fzl1F6wvh8KXVVcIuHN12xi1ZDcPA/0Vix+ZcJYwZWVHUwfIqfvzYXXEw7ybeev6477KCTt9fKydU+ajUqcg=="
    },
    "@types/caseless": {
      "version": "0.12.2",
      "resolved": "https://registry.npmjs.org/@types/caseless/-/caseless-0.12.2.tgz",
      "integrity": "sha512-6ckxMjBBD8URvjB6J3NcnuAn5Pkl7t3TizAg+xdlzzQGSPSmBcXf8KoIH0ua/i+tio+ZRUHEXp0HEmvaR4kt0w==",
      "dev": true
    },
    "@types/circular-json": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@types/circular-json/-/circular-json-0.4.0.tgz",
      "integrity": "sha512-7+kYB7x5a7nFWW1YPBh3KxhwKfiaI4PbZ1RvzBU91LZy7lWJO822CI+pqzSre/DZ7KsCuMKdHnLHHFu8AyXbQg=="
    },
    "@types/color-name": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@types/color-name/-/color-name-1.1.1.tgz",
      "integrity": "sha512-rr+OQyAjxze7GgWrSaJwydHStIhHq2lvY3BOC2Mj7KnzI7XK0Uw1TOOdI9lDoajEbSWLiYgoo4f1R51erQfhPQ==",
      "dev": true
    },
    "@types/estree": {
      "version": "0.0.39",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-0.0.39.tgz",
      "integrity": "sha512-EYNwp3bU+98cpU4lAWYYL7Zz+2gryWH1qbdDTidVd6hkiR6weksdbMadyXKXNPEkQFhXM+hVO9ZygomHXp+AIw==",
      "dev": true
    },
    "@types/glob": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/@types/glob/-/glob-7.1.2.tgz",
      "integrity": "sha512-VgNIkxK+j7Nz5P7jvUZlRvhuPSmsEfS03b0alKcq5V/STUKAa3Plemsn5mrQUO7am6OErJ4rhGEGJbACclrtRA==",
      "dev": true,
      "requires": {
        "@types/minimatch": "*",
        "@types/node": "*"
      }
    },
    "@types/jasmine": {
      "version": "3.5.10",
      "resolved": "https://registry.npmjs.org/@types/jasmine/-/jasmine-3.5.10.tgz",
      "integrity": "sha512-3F8qpwBAiVc5+HPJeXJpbrl+XjawGmciN5LgiO7Gv1pl1RHtjoMNqZpqEksaPJW05ViKe8snYInRs6xB25Xdew==",
      "dev": true
    },
    "@types/jasminewd2": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/@types/jasminewd2/-/jasminewd2-2.0.8.tgz",
      "integrity": "sha512-d9p31r7Nxk0ZH0U39PTH0hiDlJ+qNVGjlt1ucOoTUptxb2v+Y5VMnsxfwN+i3hK4yQnqBi3FMmoMFcd1JHDxdg==",
      "dev": true,
      "requires": {
        "@types/jasmine": "*"
      }
    },
    "@types/json-schema": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.5.tgz",
      "integrity": "sha512-7+2BITlgjgDhH0vvwZU/HZJVyk+2XUlvxXe8dFMedNX/aMkaOq++rMAFXc0tM7ij15QaWlbdQASBR9dihi+bDQ==",
      "dev": true
    },
    "@types/karma": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/@types/karma/-/karma-5.0.0.tgz",
      "integrity": "sha512-5quuLnxdJWkzJCEwFatOClM6O7EkeDWfXltGySb01LQnBVjtbLzIky9JLW0IKt+JfzurUjwj7b7Sb/Omsx4QYA==",
      "dev": true,
      "requires": {
        "@types/node": "*",
        "log4js": "^4.0.0"
      }
    },
    "@types/marked": {
      "version": "0.7.4",
      "resolved": "https://registry.npmjs.org/@types/marked/-/marked-0.7.4.tgz",
      "integrity": "sha512-fdg0NO4qpuHWtZk6dASgsrBggY+8N4dWthl1bAQG9ceKUNKFjqpHaDKCAhRUI6y8vavG7hLSJ4YBwJtZyZEXqw=="
    },
    "@types/minimatch": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/@types/minimatch/-/minimatch-3.0.3.tgz",
      "integrity": "sha512-tHq6qdbT9U1IRSGf14CL0pUlULksvY9OZ+5eEgl1N7t+OA3tGvNpxJCzuKQlsNgCVwbAs670L1vcVQi8j9HjnA==",
      "dev": true
    },
    "@types/moment-timezone": {
      "version": "0.5.13",
      "resolved": "https://registry.npmjs.org/@types/moment-timezone/-/moment-timezone-0.5.13.tgz",
      "integrity": "sha512-SWk1qM8DRssS5YR9L4eEX7WUhK/wc96aIr4nMa6p0kTk9YhGGOJjECVhIdPEj13fvJw72Xun69gScXSZ/UmcPg==",
      "requires": {
        "moment": ">=2.14.0"
      }
    },
    "@types/node": {
      "version": "13.13.11",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-13.13.11.tgz",
      "integrity": "sha512-FX7mIFKfnGCfq10DGWNhfCNxhACEeqH5uulT6wRRA1KEt7zgLe0HdrAd9/QQkObDqp2Z0KEV3OAmNgs0lTx5tQ==",
      "dev": true
    },
    "@types/normalize-package-data": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/@types/normalize-package-data/-/normalize-package-data-2.4.0.tgz",
      "integrity": "sha512-f5j5b/Gf71L+dbqxIpQ4Z2WlmI/mPJ0fOkGGmFgtb6sAu97EPczzbS3/tJKxmcYDj55OX6ssqwDAWOHIYDRDGA==",
      "dev": true
    },
    "@types/q": {
      "version": "1.5.2",
      "resolved": "https://registry.npmjs.org/@types/q/-/q-1.5.2.tgz",
      "integrity": "sha512-ce5d3q03Ex0sy4R14722Rmt6MT07Ua+k4FwDfdcToYJcMKNtRVQvJ6JCAPdAmAnbRb6CsX6aYb9m96NGod9uTw==",
      "dev": true
    },
    "@types/request": {
      "version": "2.48.4",
      "resolved": "https://registry.npmjs.org/@types/request/-/request-2.48.4.tgz",
      "integrity": "sha512-W1t1MTKYR8PxICH+A4HgEIPuAC3sbljoEVfyZbeFJJDbr30guDspJri2XOaM2E+Un7ZjrihaDi7cf6fPa2tbgw==",
      "dev": true,
      "requires": {
        "@types/caseless": "*",
        "@types/node": "*",
        "@types/tough-cookie": "*",
        "form-data": "^2.5.0"
      },
      "dependencies": {
        "form-data": {
          "version": "2.5.1",
          "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.5.1.tgz",
          "integrity": "sha512-m21N3WOmEEURgk6B9GLOE4RuWOFf28Lhh9qGYeNlGq4VDXUlJy2th2slBNU8Gp8EzloYZOibZJ7t5ecIrFSjVA==",
          "dev": true,
          "requires": {
            "asynckit": "^0.4.0",
            "combined-stream": "^1.0.6",
            "mime-types": "^2.1.12"
          }
        }
      }
    },
    "@types/resolve": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/@types/resolve/-/resolve-0.0.8.tgz",
      "integrity": "sha512-auApPaJf3NPfe18hSoJkp8EbZzer2ISk7o8mCC3M9he/a04+gbMF97NkpD2S8riMGvm4BMRI59/SZQSaLTKpsQ==",
      "dev": true,
      "requires": {
        "@types/node": "*"
      }
    },
    "@types/selenium-webdriver": {
      "version": "3.0.17",
      "resolved": "https://registry.npmjs.org/@types/selenium-webdriver/-/selenium-webdriver-3.0.17.tgz",
      "integrity": "sha512-tGomyEuzSC1H28y2zlW6XPCaDaXFaD6soTdb4GNdmte2qfHtrKqhy0ZFs4r/1hpazCfEZqeTSRLvSasmEx89uw==",
      "dev": true
    },
    "@types/source-list-map": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/@types/source-list-map/-/source-list-map-0.1.2.tgz",
      "integrity": "sha512-K5K+yml8LTo9bWJI/rECfIPrGgxdpeNbj+d53lwN4QjW1MCwlkhUms+gtdzigTeUyBr09+u8BwOIY3MXvHdcsA==",
      "dev": true
    },
    "@types/stacktrace-js": {
      "version": "0.0.32",
      "resolved": "https://registry.npmjs.org/@types/stacktrace-js/-/stacktrace-js-0.0.32.tgz",
      "integrity": "sha512-SdxmlrHfO0BxgbBP9HZWMUo2rima8lwMjPiWm6S0dyKkDa5CseamktFhXg8umu3TPVBkSlX6ZoB5uUDJK89yvg=="
    },
    "@types/tough-cookie": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@types/tough-cookie/-/tough-cookie-4.0.0.tgz",
      "integrity": "sha512-I99sngh224D0M7XgW1s120zxCt3VYQ3IQsuw3P3jbq5GG4yc79+ZjyKznyOGIQrflfylLgcfekeZW/vk0yng6A==",
      "dev": true
    },
    "@types/webpack-sources": {
      "version": "0.1.8",
      "resolved": "https://registry.npmjs.org/@types/webpack-sources/-/webpack-sources-0.1.8.tgz",
      "integrity": "sha512-JHB2/xZlXOjzjBB6fMOpH1eQAfsrpqVVIbneE0Rok16WXwFaznaI5vfg75U5WgGJm7V9W1c4xeRQDjX/zwvghA==",
      "dev": true,
      "requires": {
        "@types/node": "*",
        "@types/source-list-map": "*",
        "source-map": "^0.6.1"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "@webassemblyjs/ast": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ast/-/ast-1.8.5.tgz",
      "integrity": "sha512-aJMfngIZ65+t71C3y2nBBg5FFG0Okt9m0XEgWZ7Ywgn1oMAT8cNwx00Uv1cQyHtidq0Xn94R4TAywO+LCQ+ZAQ==",
      "dev": true,
      "requires": {
        "@webassemblyjs/helper-module-context": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/wast-parser": "1.8.5"
      }
    },
    "@webassemblyjs/floating-point-hex-parser": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/floating-point-hex-parser/-/floating-point-hex-parser-1.8.5.tgz",
      "integrity": "sha512-9p+79WHru1oqBh9ewP9zW95E3XAo+90oth7S5Re3eQnECGq59ly1Ri5tsIipKGpiStHsUYmY3zMLqtk3gTcOtQ==",
      "dev": true
    },
    "@webassemblyjs/helper-api-error": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-api-error/-/helper-api-error-1.8.5.tgz",
      "integrity": "sha512-Za/tnzsvnqdaSPOUXHyKJ2XI7PDX64kWtURyGiJJZKVEdFOsdKUCPTNEVFZq3zJ2R0G5wc2PZ5gvdTRFgm81zA==",
      "dev": true
    },
    "@webassemblyjs/helper-buffer": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-buffer/-/helper-buffer-1.8.5.tgz",
      "integrity": "sha512-Ri2R8nOS0U6G49Q86goFIPNgjyl6+oE1abW1pS84BuhP1Qcr5JqMwRFT3Ah3ADDDYGEgGs1iyb1DGX+kAi/c/Q==",
      "dev": true
    },
    "@webassemblyjs/helper-code-frame": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-code-frame/-/helper-code-frame-1.8.5.tgz",
      "integrity": "sha512-VQAadSubZIhNpH46IR3yWO4kZZjMxN1opDrzePLdVKAZ+DFjkGD/rf4v1jap744uPVU6yjL/smZbRIIJTOUnKQ==",
      "dev": true,
      "requires": {
        "@webassemblyjs/wast-printer": "1.8.5"
      }
    },
    "@webassemblyjs/helper-fsm": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-fsm/-/helper-fsm-1.8.5.tgz",
      "integrity": "sha512-kRuX/saORcg8se/ft6Q2UbRpZwP4y7YrWsLXPbbmtepKr22i8Z4O3V5QE9DbZK908dh5Xya4Un57SDIKwB9eow==",
      "dev": true
    },
    "@webassemblyjs/helper-module-context": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-module-context/-/helper-module-context-1.8.5.tgz",
      "integrity": "sha512-/O1B236mN7UNEU4t9X7Pj38i4VoU8CcMHyy3l2cV/kIF4U5KoHXDVqcDuOs1ltkac90IM4vZdHc52t1x8Yfs3g==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "mamacro": "^0.0.3"
      }
    },
    "@webassemblyjs/helper-wasm-bytecode": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-bytecode/-/helper-wasm-bytecode-1.8.5.tgz",
      "integrity": "sha512-Cu4YMYG3Ddl72CbmpjU/wbP6SACcOPVbHN1dI4VJNJVgFwaKf1ppeFJrwydOG3NDHxVGuCfPlLZNyEdIYlQ6QQ==",
      "dev": true
    },
    "@webassemblyjs/helper-wasm-section": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/helper-wasm-section/-/helper-wasm-section-1.8.5.tgz",
      "integrity": "sha512-VV083zwR+VTrIWWtgIUpqfvVdK4ff38loRmrdDBgBT8ADXYsEZ5mPQ4Nde90N3UYatHdYoDIFb7oHzMncI02tA==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-buffer": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/wasm-gen": "1.8.5"
      }
    },
    "@webassemblyjs/ieee754": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/ieee754/-/ieee754-1.8.5.tgz",
      "integrity": "sha512-aaCvQYrvKbY/n6wKHb/ylAJr27GglahUO89CcGXMItrOBqRarUMxWLJgxm9PJNuKULwN5n1csT9bYoMeZOGF3g==",
      "dev": true,
      "requires": {
        "@xtuc/ieee754": "^1.2.0"
      }
    },
    "@webassemblyjs/leb128": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/leb128/-/leb128-1.8.5.tgz",
      "integrity": "sha512-plYUuUwleLIziknvlP8VpTgO4kqNaH57Y3JnNa6DLpu/sGcP6hbVdfdX5aHAV716pQBKrfuU26BJK29qY37J7A==",
      "dev": true,
      "requires": {
        "@xtuc/long": "4.2.2"
      }
    },
    "@webassemblyjs/utf8": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/utf8/-/utf8-1.8.5.tgz",
      "integrity": "sha512-U7zgftmQriw37tfD934UNInokz6yTmn29inT2cAetAsaU9YeVCveWEwhKL1Mg4yS7q//NGdzy79nlXh3bT8Kjw==",
      "dev": true
    },
    "@webassemblyjs/wasm-edit": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-edit/-/wasm-edit-1.8.5.tgz",
      "integrity": "sha512-A41EMy8MWw5yvqj7MQzkDjU29K7UJq1VrX2vWLzfpRHt3ISftOXqrtojn7nlPsZ9Ijhp5NwuODuycSvfAO/26Q==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-buffer": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/helper-wasm-section": "1.8.5",
        "@webassemblyjs/wasm-gen": "1.8.5",
        "@webassemblyjs/wasm-opt": "1.8.5",
        "@webassemblyjs/wasm-parser": "1.8.5",
        "@webassemblyjs/wast-printer": "1.8.5"
      }
    },
    "@webassemblyjs/wasm-gen": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-gen/-/wasm-gen-1.8.5.tgz",
      "integrity": "sha512-BCZBT0LURC0CXDzj5FXSc2FPTsxwp3nWcqXQdOZE4U7h7i8FqtFK5Egia6f9raQLpEKT1VL7zr4r3+QX6zArWg==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/ieee754": "1.8.5",
        "@webassemblyjs/leb128": "1.8.5",
        "@webassemblyjs/utf8": "1.8.5"
      }
    },
    "@webassemblyjs/wasm-opt": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-opt/-/wasm-opt-1.8.5.tgz",
      "integrity": "sha512-HKo2mO/Uh9A6ojzu7cjslGaHaUU14LdLbGEKqTR7PBKwT6LdPtLLh9fPY33rmr5wcOMrsWDbbdCHq4hQUdd37Q==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-buffer": "1.8.5",
        "@webassemblyjs/wasm-gen": "1.8.5",
        "@webassemblyjs/wasm-parser": "1.8.5"
      }
    },
    "@webassemblyjs/wasm-parser": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wasm-parser/-/wasm-parser-1.8.5.tgz",
      "integrity": "sha512-pi0SYE9T6tfcMkthwcgCpL0cM9nRYr6/6fjgDtL6q/ZqKHdMWvxitRi5JcZ7RI4SNJJYnYNaWy5UUrHQy998lw==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/helper-api-error": "1.8.5",
        "@webassemblyjs/helper-wasm-bytecode": "1.8.5",
        "@webassemblyjs/ieee754": "1.8.5",
        "@webassemblyjs/leb128": "1.8.5",
        "@webassemblyjs/utf8": "1.8.5"
      }
    },
    "@webassemblyjs/wast-parser": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-parser/-/wast-parser-1.8.5.tgz",
      "integrity": "sha512-daXC1FyKWHF1i11obK086QRlsMsY4+tIOKgBqI1lxAnkp9xe9YMcgOxm9kLe+ttjs5aWV2KKE1TWJCN57/Btsg==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/floating-point-hex-parser": "1.8.5",
        "@webassemblyjs/helper-api-error": "1.8.5",
        "@webassemblyjs/helper-code-frame": "1.8.5",
        "@webassemblyjs/helper-fsm": "1.8.5",
        "@xtuc/long": "4.2.2"
      }
    },
    "@webassemblyjs/wast-printer": {
      "version": "1.8.5",
      "resolved": "https://registry.npmjs.org/@webassemblyjs/wast-printer/-/wast-printer-1.8.5.tgz",
      "integrity": "sha512-w0U0pD4EhlnvRyeJzBqaVSJAo9w/ce7/WPogeXLzGkO6hzhr4GnQIZ4W4uUt5b9ooAaXPtnXlj0gzsXEOUNYMg==",
      "dev": true,
      "requires": {
        "@webassemblyjs/ast": "1.8.5",
        "@webassemblyjs/wast-parser": "1.8.5",
        "@xtuc/long": "4.2.2"
      }
    },
    "@xtuc/ieee754": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@xtuc/ieee754/-/ieee754-1.2.0.tgz",
      "integrity": "sha512-DX8nKgqcGwsc0eJSqYt5lwP4DH5FlHnmuWWBRy7X0NcaGR0ZtuyeESgMwTYVEtxmsNGY+qit4QYT/MIYTOTPeA==",
      "dev": true
    },
    "@xtuc/long": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@xtuc/long/-/long-4.2.2.tgz",
      "integrity": "sha512-NuHqBY1PB/D8xU6s/thBgOAiAP7HOYDQ32+BFZILJ8ivkUkAHQnWfn6WhL79Owj1qmUnoN/YPhktdIoucipkAQ==",
      "dev": true
    },
    "@yarnpkg/lockfile": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@yarnpkg/lockfile/-/lockfile-1.1.0.tgz",
      "integrity": "sha512-GpSwvyXOcOOlV70vbnzjj4fW5xW/FdUF6nQEt1ENy7m4ZCczi1+/buVUPAqmGfqznsORNFzUMjctTIp8a9tuCQ==",
      "dev": true
    },
    "JSONStream": {
      "version": "1.3.5",
      "resolved": "https://registry.npmjs.org/JSONStream/-/JSONStream-1.3.5.tgz",
      "integrity": "sha512-E+iruNOY8VV9s4JEbe1aNEm6MiszPRr/UfcHMz0TQh1BXSxHK+ASV1R6W4HpjBhSeS+54PIsAMCBmwD06LLsqQ==",
      "dev": true,
      "requires": {
        "jsonparse": "^1.2.0",
        "through": ">=2.2.7 <3"
      }
    },
    "abbrev": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/abbrev/-/abbrev-1.0.9.tgz",
      "integrity": "sha1-kbR5JYinc4wl813W9jdSovh3YTU=",
      "dev": true
    },
    "accepts": {
      "version": "1.3.7",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.7.tgz",
      "integrity": "sha512-Il80Qs2WjYlJIBNzNkK6KYqlVMTbZLXgHx2oT0pU/fjRHyEp+PEfEPY0R3WCwAGVOtauxh1hOxNgIf5bv7dQpA==",
      "dev": true,
      "requires": {
        "mime-types": "~2.1.24",
        "negotiator": "0.6.2"
      }
    },
    "acorn": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-7.2.0.tgz",
      "integrity": "sha512-apwXVmYVpQ34m/i71vrApRrRKCWQnZZF1+npOD0WV5xZFfwWOmKGQ2RWlfdy9vWITsenisM8M0Qeq8agcFHNiQ==",
      "dev": true
    },
    "acorn-jsx": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-3.0.1.tgz",
      "integrity": "sha1-r9+UiPsezvyDSPb7IvRk4ypYs2s=",
      "dev": true,
      "requires": {
        "acorn": "^3.0.4"
      },
      "dependencies": {
        "acorn": {
          "version": "3.3.0",
          "resolved": "https://registry.npmjs.org/acorn/-/acorn-3.3.0.tgz",
          "integrity": "sha1-ReN/s56No/JbruP/U2niu18iAXo=",
          "dev": true
        }
      }
    },
    "adm-zip": {
      "version": "0.4.14",
      "resolved": "https://registry.npmjs.org/adm-zip/-/adm-zip-0.4.14.tgz",
      "integrity": "sha512-/9aQCnQHF+0IiCl0qhXoK7qs//SwYE7zX8lsr/DNk1BRAHYxeLZPL4pguwK29gUEqasYQjqPtEpDRSWEkdHn9g==",
      "dev": true
    },
    "after": {
      "version": "0.8.2",
      "resolved": "https://registry.npmjs.org/after/-/after-0.8.2.tgz",
      "integrity": "sha1-/ts5T58OAqqXaOcCvaI7UF+ufh8=",
      "dev": true
    },
    "agent-base": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.3.0.tgz",
      "integrity": "sha512-salcGninV0nPrwpGNn4VTXBb1SOuXQBiqbrNXoeizJsHrsL6ERFM2Ne3JUSBWRE6aeNJI2ROP/WEEIDUiDe3cg==",
      "dev": true,
      "requires": {
        "es6-promisify": "^5.0.0"
      }
    },
    "agentkeepalive": {
      "version": "3.5.2",
      "resolved": "https://registry.npmjs.org/agentkeepalive/-/agentkeepalive-3.5.2.tgz",
      "integrity": "sha512-e0L/HNe6qkQ7H19kTlRRqUibEAwDK5AFk6y3PtMsuut2VAH6+Q4xZml1tNDJD7kSAyqmbG/K08K5WEJYtUrSlQ==",
      "dev": true,
      "requires": {
        "humanize-ms": "^1.2.1"
      }
    },
    "aggregate-error": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/aggregate-error/-/aggregate-error-3.0.1.tgz",
      "integrity": "sha512-quoaXsZ9/BLNae5yiNoUz+Nhkwz83GhWwtYFglcjEQB2NDHCIpApbqXxIFnm4Pq/Nvhrsq5sYJFyohrrxnTGAA==",
      "dev": true,
      "requires": {
        "clean-stack": "^2.0.0",
        "indent-string": "^4.0.0"
      }
    },
    "ajv": {
      "version": "6.12.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.0.tgz",
      "integrity": "sha512-D6gFiFA0RRLyUbvijN74DWAjXSFxWKaWP7mldxkVhyhAV3+SWA9HEJPHQ2c9soIeTFJqcSdFDGFgdqs1iUU2Hw==",
      "requires": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      }
    },
    "ajv-errors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/ajv-errors/-/ajv-errors-1.0.1.tgz",
      "integrity": "sha512-DCRfO/4nQ+89p/RK43i8Ezd41EqdGIU4ld7nGF8OQ14oc/we5rEntLCUa7+jrn3nn83BosfwZA0wb4pon2o8iQ=="
    },
    "ajv-keywords": {
      "version": "3.4.1",
      "resolved": "https://registry.npmjs.org/ajv-keywords/-/ajv-keywords-3.4.1.tgz",
      "integrity": "sha512-RO1ibKvd27e6FEShVFfPALuHI3WjSVNeK5FIsmme/LYRNxjKuNj+Dt7bucLa6NdSv3JcVTyMlm9kGR84z1XpaQ=="
    },
    "alphanum-sort": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/alphanum-sort/-/alphanum-sort-1.0.2.tgz",
      "integrity": "sha1-l6ERlkmyEa0zaR2fn0hqjsn74KM=",
      "dev": true
    },
    "amdefine": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/amdefine/-/amdefine-1.0.1.tgz",
      "integrity": "sha1-SlKCrBZHKek2Gbz9OtFR+BfOkfU=",
      "dev": true,
      "optional": true
    },
    "angular2-virtual-scroll": {
      "version": "0.4.16",
      "resolved": "https://registry.npmjs.org/angular2-virtual-scroll/-/angular2-virtual-scroll-0.4.16.tgz",
      "integrity": "sha512-6NWk0DjCh4ebU8+LgfBoKYyp3McxDA/k5vTnEiV32VpVnyhN//eThZpVpggI1D2fJBqgTAY09C8v++qXHHLP7A==",
      "requires": {
        "@tweenjs/tween.js": "^17.1.0"
      }
    },
    "ansi-align": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/ansi-align/-/ansi-align-3.0.0.tgz",
      "integrity": "sha512-ZpClVKqXN3RGBmKibdfWzqCY4lnjEuoNzU5T0oEFpfd/z5qJHVarukridD4juLO2FXMiwUQxr9WqQtaYa8XRYw==",
      "dev": true,
      "requires": {
        "string-width": "^3.0.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-4.1.0.tgz",
          "integrity": "sha512-1apePfXM1UOSqw0o9IiFAovVz9M5S1Dg+4TrDwfMewQ6p/rmMueb7tWZjQ1rx4Loy1ArBggoqGpfqqdI4rondg==",
          "dev": true
        },
        "emoji-regex": {
          "version": "7.0.3",
          "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-7.0.3.tgz",
          "integrity": "sha512-CwBLREIQ7LvYFB0WyRvwhq5N5qPhc6PMjD6bYggFlI5YyDgl+0vxq5VHbMOFqLg7hfWzmu8T5Z1QofhmTIhItA==",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-2.0.0.tgz",
          "integrity": "sha1-o7MKXE8ZkYMWeqq5O+764937ZU8=",
          "dev": true
        },
        "string-width": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-3.1.0.tgz",
          "integrity": "sha512-vafcv6KjVZKSgz06oM/H6GDBrAtz8vdhQakGjFIvNrHA6y3HCF1CInLy+QLq8dTJPQ1b+KDUqDFctkdRW44e1w==",
          "dev": true,
          "requires": {
            "emoji-regex": "^7.0.1",
            "is-fullwidth-code-point": "^2.0.0",
            "strip-ansi": "^5.1.0"
          }
        },
        "strip-ansi": {
          "version": "5.2.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-5.2.0.tgz",
          "integrity": "sha512-DuRs1gKbBqsMKIZlrffwlug8MHkcnpjs5VPmL1PAh+mA30U0DTotfDZ0d2UUsXpPmPmMMJ6W773MaA3J+lbiWA==",
          "dev": true,
          "requires": {
            "ansi-regex": "^4.1.0"
          }
        }
      }
    },
    "ansi-colors": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/ansi-colors/-/ansi-colors-3.2.4.tgz",
      "integrity": "sha512-hHUXGagefjN2iRrID63xckIvotOXOojhQKWIPUZ4mNUZ9nLZW+7FMNoE1lOkEhNWYsx/7ysGIuJYCiMAA9FnrA==",
      "dev": true
    },
    "ansi-escapes": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/ansi-escapes/-/ansi-escapes-4.3.1.tgz",
      "integrity": "sha512-JWF7ocqNrp8u9oqpgV+wH5ftbt+cfvv+PTjOvKLT3AdYly/LmORARfEVT1iyjwN+4MqE5UmVKoAdIBqeoCHgLA==",
      "dev": true,
      "requires": {
        "type-fest": "^0.11.0"
      }
    },
    "ansi-gray": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/ansi-gray/-/ansi-gray-0.1.1.tgz",
      "integrity": "sha1-KWLPVOyXksSFEKPetSRDaGHvclE=",
      "dev": true,
      "requires": {
        "ansi-wrap": "0.1.0"
      }
    },
    "ansi-html": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/ansi-html/-/ansi-html-0.0.7.tgz",
      "integrity": "sha1-gTWEAhliqenm/QOflA0S9WynhZ4=",
      "dev": true
    },
    "ansi-regex": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-2.1.1.tgz",
      "integrity": "sha1-w7M6te42DYbg5ijwRorn7yfWVN8=",
      "dev": true
    },
    "ansi-styles": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-3.2.1.tgz",
      "integrity": "sha512-VT0ZI6kZRdTh8YyJw3SMbYm/u+NqfsAxEpWO0Pf9sq8/e94WxxOpPKx9FR1FlyCtOVDNOQ+8ntlqFxiRc+r5qA==",
      "dev": true,
      "requires": {
        "color-convert": "^1.9.0"
      }
    },
    "ansi-wrap": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/ansi-wrap/-/ansi-wrap-0.1.0.tgz",
      "integrity": "sha1-qCJQ3bABXponyoLoLqYDu/pF768=",
      "dev": true
    },
    "any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha1-q8av7tzqUugJzcA3au0845Y10X8=",
      "dev": true
    },
    "anymatch": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.1.tgz",
      "integrity": "sha512-mM8522psRCqzV+6LhomX5wgp25YVibjh8Wj23I5RPkPppSVSjyKD2A2mBJmWGa+KN7f2D6LNh9jkBCeyLktzjg==",
      "requires": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      }
    },
    "app-root-path": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/app-root-path/-/app-root-path-2.2.1.tgz",
      "integrity": "sha512-91IFKeKk7FjfmezPKkwtaRvSpnUc4gDwPAjA1YZ9Gn0q0PPeW+vbeUsZuyDwjI7+QTHhcLen2v25fi/AmhvbJA==",
      "dev": true
    },
    "append-buffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/append-buffer/-/append-buffer-1.0.2.tgz",
      "integrity": "sha1-2CIM9GYIFSXv6lBhTz3mUU36WPE=",
      "dev": true,
      "requires": {
        "buffer-equal": "^1.0.0"
      }
    },
    "append-transform": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/append-transform/-/append-transform-1.0.0.tgz",
      "integrity": "sha512-P009oYkeHyU742iSZJzZZywj4QRJdnTWffaKuJQLablCZ1uz6/cW4yaRgcDaoQ+uwOxxnt0gRUcwfsNP2ri0gw==",
      "dev": true,
      "requires": {
        "default-require-extensions": "^2.0.0"
      }
    },
    "aproba": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/aproba/-/aproba-1.2.0.tgz",
      "integrity": "sha512-Y9J6ZjXtoYh8RnXVCMOU/ttDmk1aBjunq9vO0ta5x85WDQiQfUF9sIPBITdbiiIVcBo03Hi3jMxigBtsddlXRw==",
      "dev": true
    },
    "archy": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/archy/-/archy-1.0.0.tgz",
      "integrity": "sha1-+cjBN1fMHde8N5rHeyxipcKGjEA=",
      "dev": true
    },
    "arg": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/arg/-/arg-4.1.3.tgz",
      "integrity": "sha512-58S9QDqG0Xx27YwPSt9fJxivjYl432YCwfDMfZ+71RAqUrZef7LrKQZ3LHLOwCS4FLNBplP533Zx895SeOCHvA==",
      "dev": true
    },
    "argparse": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-1.0.10.tgz",
      "integrity": "sha512-o5Roy6tNG4SL/FOkCAN6RzjiakZS25RLYFrcMttJqbdd8BWrnA+fGz57iN5Pb06pvBGvl5gQ0B48dJlslXvoTg==",
      "dev": true,
      "requires": {
        "sprintf-js": "~1.0.2"
      }
    },
    "argv": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/argv/-/argv-0.0.2.tgz",
      "integrity": "sha1-7L0W+JSbFXGDcRsb2jNPN4QBhas=",
      "dev": true
    },
    "aria-query": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-3.0.0.tgz",
      "integrity": "sha1-ZbP8wcoRVajJrmTW7uKX8V1RM8w=",
      "dev": true,
      "requires": {
        "ast-types-flow": "0.0.7",
        "commander": "^2.11.0"
      }
    },
    "arr-diff": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",
      "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",
      "dev": true
    },
    "arr-filter": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/arr-filter/-/arr-filter-1.1.2.tgz",
      "integrity": "sha1-Q/3d0JHo7xGqTEXZzcGOLf8XEe4=",
      "dev": true,
      "requires": {
        "make-iterator": "^1.0.0"
      }
    },
    "arr-flatten": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/arr-flatten/-/arr-flatten-1.1.0.tgz",
      "integrity": "sha512-L3hKV5R/p5o81R7O02IGnwpDmkp6E982XhtbuwSe3O4qOtMMMtodicASA1Cny2U+aCXcNpml+m4dPsvsJ3jatg==",
      "dev": true
    },
    "arr-map": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/arr-map/-/arr-map-2.0.2.tgz",
      "integrity": "sha1-Onc0X/wc814qkYJWAfnljy4kysQ=",
      "dev": true,
      "requires": {
        "make-iterator": "^1.0.0"
      }
    },
    "arr-union": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/arr-union/-/arr-union-3.1.0.tgz",
      "integrity": "sha1-45sJrqne+Gao8gbiiK9jkZuuOcQ=",
      "dev": true
    },
    "array-each": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/array-each/-/array-each-1.0.1.tgz",
      "integrity": "sha1-p5SvDAWrF1KEbudTofIRoFugxE8=",
      "dev": true
    },
    "array-flatten": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-2.1.2.tgz",
      "integrity": "sha512-hNfzcOV8W4NdualtqBFPyVO+54DSJuZGY9qT4pRroB6S9e3iiido2ISIC5h9R2sPJ8H3FHCIiEnsv1lPXO3KtQ==",
      "dev": true
    },
    "array-initial": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/array-initial/-/array-initial-1.1.0.tgz",
      "integrity": "sha1-L6dLJnOTccOUe9enrcc74zSz15U=",
      "dev": true,
      "requires": {
        "array-slice": "^1.0.0",
        "is-number": "^4.0.0"
      },
      "dependencies": {
        "is-number": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-4.0.0.tgz",
          "integrity": "sha512-rSklcAIlf1OmFdyAqbnWTLVelsQ58uvZ66S/ZyawjWqIviTWCjg2PzVGw8WUA+nNuPTqb4wgA+NszrJ+08LlgQ==",
          "dev": true
        }
      }
    },
    "array-last": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/array-last/-/array-last-1.3.0.tgz",
      "integrity": "sha512-eOCut5rXlI6aCOS7Z7kCplKRKyiFQ6dHFBem4PwlwKeNFk2/XxTrhRh5T9PyaEWGy/NHTZWbY+nsZlNFJu9rYg==",
      "dev": true,
      "requires": {
        "is-number": "^4.0.0"
      },
      "dependencies": {
        "is-number": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/is-number/-/is-number-4.0.0.tgz",
          "integrity": "sha512-rSklcAIlf1OmFdyAqbnWTLVelsQ58uvZ66S/ZyawjWqIviTWCjg2PzVGw8WUA+nNuPTqb4wgA+NszrJ+08LlgQ==",
          "dev": true
        }
      }
    },
    "array-slice": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/array-slice/-/array-slice-1.1.0.tgz",
      "integrity": "sha512-B1qMD3RBP7O8o0H2KbrXDyB0IccejMF15+87Lvlor12ONPRHP6gTjXMNkt/d3ZuOGbAe66hFmaCfECI24Ufp6w==",
      "dev": true
    },
    "array-sort": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/array-sort/-/array-sort-1.0.0.tgz",
      "integrity": "sha512-ihLeJkonmdiAsD7vpgN3CRcx2J2S0TiYW+IS/5zHBI7mKUq3ySvBdzzBfD236ubDBQFiiyG3SWCPc+msQ9KoYg==",
      "dev": true,
      "requires": {
        "default-compare": "^1.0.0",
        "get-value": "^2.0.6",
        "kind-of": "^5.0.2"
      },
      "dependencies": {
        "kind-of": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",
          "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",
          "dev": true
        }
      }
    },
    "array-union": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-union/-/array-union-1.0.2.tgz",
      "integrity": "sha1-mjRBDk9OPaI96jdb5b5w8kd47Dk=",
      "dev": true,
      "requires": {
        "array-uniq": "^1.0.1"
      }
    },
    "array-uniq": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/array-uniq/-/array-uniq-1.0.3.tgz",
      "integrity": "sha1-r2rId6Jcx/dOBYiUdThY39sk/bY=",
      "dev": true
    },
    "array-unique": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",
      "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",
      "dev": true
    },
    "arraybuffer.slice": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/arraybuffer.slice/-/arraybuffer.slice-0.0.7.tgz",
      "integrity": "sha512-wGUIVQXuehL5TCqQun8OW81jGzAWycqzFF8lFp+GOM5BXLYj3bKNsYC4daB7n6XjCqxQA/qgTJ+8ANR3acjrog==",
      "dev": true
    },
    "arrify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/arrify/-/arrify-1.0.1.tgz",
      "integrity": "sha1-iYUI2iIm84DfkEcoRWhJwVAaSw0=",
      "dev": true
    },
    "asap": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/asap/-/asap-2.0.6.tgz",
      "integrity": "sha1-5QNHYR1+aQlDIIu9r+vLwvuGbUY=",
      "dev": true
    },
    "asn1": {
      "version": "0.2.4",
      "resolved": "https://registry.npmjs.org/asn1/-/asn1-0.2.4.tgz",
      "integrity": "sha512-jxwzQpLQjSmWXgwaCZE9Nz+glAG01yF1QnWgbhGwHI5A6FRIEY6IVqtHhIepHqI7/kyEyQEagBC5mBEFlIYvdg==",
      "dev": true,
      "requires": {
        "safer-buffer": "~2.1.0"
      }
    },
    "asn1.js": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/asn1.js/-/asn1.js-4.10.1.tgz",
      "integrity": "sha512-p32cOF5q0Zqs9uBiONKYLm6BClCoBCM5O9JfeUSlnQLBTxYdTK+pW+nXflm8UkKd2UYlEbYz5qEi0JuZR9ckSw==",
      "dev": true,
      "requires": {
        "bn.js": "^4.0.0",
        "inherits": "^2.0.1",
        "minimalistic-assert": "^1.0.0"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw==",
          "dev": true
        }
      }
    },
    "assert": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/assert/-/assert-1.5.0.tgz",
      "integrity": "sha512-EDsgawzwoun2CZkCgtxJbv392v4nbk9XDD06zI+kQYoBM/3RBWLlEyJARDOmhAAosBjWACEkKL6S+lIZtcAubA==",
      "dev": true,
      "requires": {
        "object-assign": "^4.1.1",
        "util": "0.10.3"
      },
      "dependencies": {
        "inherits": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.1.tgz",
          "integrity": "sha1-sX0I0ya0Qj5Wjv9xn5GwscvfafE=",
          "dev": true
        },
        "util": {
          "version": "0.10.3",
          "resolved": "https://registry.npmjs.org/util/-/util-0.10.3.tgz",
          "integrity": "sha1-evsa/lCAUkZInj23/g7TeTNqwPk=",
          "dev": true,
          "requires": {
            "inherits": "2.0.1"
          }
        }
      }
    },
    "assert-plus": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assert-plus/-/assert-plus-1.0.0.tgz",
      "integrity": "sha1-8S4PPF13sLHN2RRpQuTpbB5N1SU=",
      "dev": true
    },
    "assign-symbols": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/assign-symbols/-/assign-symbols-1.0.0.tgz",
      "integrity": "sha1-WWZ/QfrdTyDMvCu5a41Pf3jsA2c=",
      "dev": true
    },
    "ast-types-flow": {
      "version": "0.0.7",
      "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.7.tgz",
      "integrity": "sha1-9wtzXGvKGlycItmCw+Oef+ujva0=",
      "dev": true
    },
    "async": {
      "version": "2.6.3",
      "resolved": "https://registry.npmjs.org/async/-/async-2.6.3.tgz",
      "integrity": "sha512-zflvls11DCy+dQWzTW2dzuilv8Z5X/pjfmZOWba6TNIVDm+2UDaJmXSOXlasHKfNBs8oo3M0aT50fDEWfKZjXg==",
      "dev": true,
      "requires": {
        "lodash": "^4.17.14"
      }
    },
    "async-array-reduce": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/async-array-reduce/-/async-array-reduce-0.2.1.tgz",
      "integrity": "sha1-yL4BCitc0A3qlsgRFgNGk9/dgtE=",
      "dev": true
    },
    "async-done": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/async-done/-/async-done-1.3.2.tgz",
      "integrity": "sha512-uYkTP8dw2og1tu1nmza1n1CMW0qb8gWWlwqMmLb7MhBVs4BXrFziT6HXUd+/RlRA/i4H9AkofYloUbs1fwMqlw==",
      "dev": true,
      "requires": {
        "end-of-stream": "^1.1.0",
        "once": "^1.3.2",
        "process-nextick-args": "^2.0.0",
        "stream-exhaust": "^1.0.1"
      }
    },
    "async-each": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/async-each/-/async-each-1.0.3.tgz",
      "integrity": "sha512-z/WhQ5FPySLdvREByI2vZiTWwCnF0moMJ1hK9YQwDTHKh6I7/uSckMetoRGb5UBZPC1z0jlw+n/XCgjeH7y1AQ==",
      "dev": true
    },
    "async-limiter": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/async-limiter/-/async-limiter-1.0.1.tgz",
      "integrity": "sha512-csOlWGAcRFJaI6m+F2WKdnMKr4HhdhFVBk0H/QbJFMCr+uO2kwohwXQPxw/9OCxp05r5ghVBFSyioixx3gfkNQ==",
      "dev": true
    },
    "async-settle": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/async-settle/-/async-settle-1.0.0.tgz",
      "integrity": "sha1-HQqRS7Aldb7IqPOnTlCA9yssDGs=",
      "dev": true,
      "requires": {
        "async-done": "^1.2.2"
      }
    },
    "asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha1-x57Zf380y48robyXkLzDZkdLS3k=",
      "dev": true
    },
    "at-least-node": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/at-least-node/-/at-least-node-1.0.0.tgz",
      "integrity": "sha512-+q/t7Ekv1EDY2l6Gda6LLiX14rU9TV20Wa3ofeQmwPFZbOMo9DXrLbOjFaaclkXKWidIaopwAObQDqwWtGUjqg==",
      "dev": true
    },
    "atob": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/atob/-/atob-2.1.2.tgz",
      "integrity": "sha512-Wm6ukoaOGJi/73p/cl2GvLjTI5JM1k/O14isD73YML8StrH/7/lRFgmg8nICZgD3bZZvjwCGxtMOD3wWNAu8cg==",
      "dev": true
    },
    "autoprefixer": {
      "version": "9.7.4",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-9.7.4.tgz",
      "integrity": "sha512-g0Ya30YrMBAEZk60lp+qfX5YQllG+S5W3GYCFvyHTvhOki0AEQJLPEcIuGRsqVwLi8FvXPVtwTGhfr38hVpm0g==",
      "dev": true,
      "requires": {
        "browserslist": "^4.8.3",
        "caniuse-lite": "^1.0.30001020",
        "chalk": "^2.4.2",
        "normalize-range": "^0.1.2",
        "num2fraction": "^1.2.2",
        "postcss": "^7.0.26",
        "postcss-value-parser": "^4.0.2"
      }
    },
    "aws-sign2": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/aws-sign2/-/aws-sign2-0.7.0.tgz",
      "integrity": "sha1-tG6JCTSpWR8tL2+G1+ap8bP+dqg=",
      "dev": true
    },
    "aws4": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/aws4/-/aws4-1.9.1.tgz",
      "integrity": "sha512-wMHVg2EOHaMRxbzgFJ9gtjOOCrI80OHLG14rxi28XwOW8ux6IiEbRCGGGqCtdAIg4FQCbW20k9RsT4y3gJlFug==",
      "dev": true
    },
    "axobject-query": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-2.0.2.tgz",
      "integrity": "sha512-MCeek8ZH7hKyO1rWUbKNQBbl4l2eY0ntk7OGi+q0RlafrCnfPxC06WZA+uebCfmYp4mNU9jRBP1AhGyf8+W3ww==",
      "dev": true,
      "requires": {
        "ast-types-flow": "0.0.7"
      }
    },
    "babel-loader": {
      "version": "8.0.6",
      "resolved": "https://registry.npmjs.org/babel-loader/-/babel-loader-8.0.6.tgz",
      "integrity": "sha512-4BmWKtBOBm13uoUwd08UwjZlaw3O9GWf456R9j+5YykFZ6LUIjIKLc0zEZf+hauxPOJs96C8k6FvYD09vWzhYw==",
      "dev": true,
      "requires": {
        "find-cache-dir": "^2.0.0",
        "loader-utils": "^1.0.2",
        "mkdirp": "^0.5.1",
        "pify": "^4.0.1"
      },
      "dependencies": {
        "find-cache-dir": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/find-cache-dir/-/find-cache-dir-2.1.0.tgz",
          "integrity": "sha512-Tq6PixE0w/VMFfCgbONnkiQIVol/JJL7nRMi20fqzA4NRs9AfeqMGeRdPi3wIhYkxjeBaWh2rxwapn5Tu3IqOQ==",
          "dev": true,
          "requires": {
            "commondir": "^1.0.1",
            "make-dir": "^2.0.0",
            "pkg-dir": "^3.0.0"
          },
          "dependencies": {
            "commondir": {
              "version": "1.0.1",
              "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
              "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs=",
              "dev": true
            },
            "pkg-dir": {
              "version": "3.0.0",
              "resolved": "https://registry.npmjs.org/pkg-dir/-/pkg-dir-3.0.0.tgz",
              "integrity": "sha512-/E57AYkoeQ25qkxMj5PBOVgF8Kiu/h7cYS30Z5+R7WaiCCBfLq58ZI/dSeaEKb9WVJV5n/03QwrN3IeWIFllvw==",
              "dev": true,
              "requires": {
                "find-up": "^3.0.0"
              }
            }
          }
        },
        "find-up": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/find-up/-/find-up-3.0.0.tgz",
          "integrity": "sha512-1yD6RmLI1XBfxugvORwlck6f75tYL+iR0jqwsOrOxMZyGYqUuDhJ0l4AXdO1iX/FTs9cBAMEk1gWSEx1kSbylg==",
          "dev": true,
          "requires": {
            "locate-path": "^3.0.0"
          }
        },
        "json5": {
          "version": "1.0.1",
          "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.1.tgz",
          "integrity": "sha512-aKS4WQjPenRxiQsC93MNfjx+nbF4PAdYzmd/1JIj8HYzqfbu86beTuNgXDzPknWk0n0uARlyewZo4s++ES36Ow==",
          "dev": true,
          "requires": {
            "minimist": "^1.2.0"
          }
        },
        "loader-utils": {
          "version": "1.4.0",
          "resolved": "https://registry.npmjs.org/loader-utils/-/loader-utils-1.4.0.tgz",
          "integrity": "sha512-qH0WSMBtn/oHuwjy/NucEgbx5dbxxnxup9s4PVXJUDHZBQY+s0NWA9rJf53RBnQZxfch7euUui7hpoAPvALZdA==",
          "dev": true,
          "requires": {
            "big.js": "^5.2.2",
            "emojis-list": "^3.0.0",
            "json5": "^1.0.1"
          }
        },
        "locate-path": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-3.0.0.tgz",
          "integrity": "sha512-7AO748wWnIhNqAuaty2ZWHkQHRSNfPVIsPIfwEOWO22AmaoVrWavlOcMR5nzTLNYvp36X220/maaRsrec1G65A==",
          "dev": true,
          "requires": {
            "p-locate": "^3.0.0",
            "path-exists": "^3.0.0"
          }
        },
        "p-limit": {
          "version": "2.3.0",
          "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
          "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
          "dev": true,
          "requires": {
            "p-try": "^2.0.0"
          }
        },
        "p-locate": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-3.0.0.tgz",
          "integrity": "sha512-x+12w/To+4GFfgJhBEpiDcLozRJGegY+Ei7/z0tSLkMmxGZNybVMSfWj9aJn8Z5Fc7dBUNJOOVgPv2H7IwulSQ==",
          "dev": true,
          "requires": {
            "p-limit": "^2.0.0"
          }
        },
        "p-try": {
          "version": "2.2.0",
          "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
          "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==",
          "dev": true
        },
        "pify": {
          "version": "4.0.1",
          "resolved": "https://registry.npmjs.org/pify/-/pify-4.0.1.tgz",
          "integrity": "sha512-uB80kBFb/tfd68bVleG9T5GGsGPjJrLAUpR5PZIrhBnIaRTQRjqdJSsIKkOP6OAIFbj7GOrcudc5pNjZ+geV2g==",
          "dev": true
        }
      }
    },
    "babel-plugin-dynamic-import-node": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/babel-plugin-dynamic-import-node/-/babel-plugin-dynamic-import-node-2.3.3.tgz",
      "integrity": "sha512-jZVI+s9Zg3IqA/kdi0i6UDCybUI3aSBLnglhYbSSjKlV7yF1F/5LWv8MakQmvYpnbJDS6fcBL2KzHSxNCMtWSQ==",
      "dev": true,
      "requires": {
        "object.assign": "^4.1.0"
      }
    },
    "bach": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/bach/-/bach-1.2.0.tgz",
      "integrity": "sha1-Szzpa/JxNPeaG0FKUcFONMO9mIA=",
      "dev": true,
      "requires": {
        "arr-filter": "^1.1.1",
        "arr-flatten": "^1.0.1",
        "arr-map": "^2.0.0",
        "array-each": "^1.0.0",
        "array-initial": "^1.0.0",
        "array-last": "^1.1.1",
        "async-done": "^1.2.2",
        "async-settle": "^1.0.0",
        "now-and-later": "^2.0.0"
      }
    },
    "backo2": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/backo2/-/backo2-1.0.2.tgz",
      "integrity": "sha1-MasayLEpNjRj41s+u2n038+6eUc=",
      "dev": true
    },
    "balanced-match": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.0.tgz",
      "integrity": "sha1-ibTRmasr7kneFk6gK4nORi1xt2c=",
      "dev": true
    },
    "base": {
      "version": "0.11.2",
      "resolved": "https://registry.npmjs.org/base/-/base-0.11.2.tgz",
      "integrity": "sha512-5T6P4xPgpp0YDFvSWwEZ4NoE3aM4QBQXDzmVbraCkFj8zHM+mba8SyqB5DbZWyR7mYHo6Y7BdQo3MoA4m0TeQg==",
      "dev": true,
      "requires": {
        "cache-base": "^1.0.1",
        "class-utils": "^0.3.5",
        "component-emitter": "^1.2.1",
        "define-property": "^1.0.0",
        "isobject": "^3.0.1",
        "mixin-deep": "^1.2.0",
        "pascalcase": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",
          "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^1.0.0"
          }
        },
        "is-accessor-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-1.0.0.tgz",
          "integrity": "sha512-m5hnHTkcVsPfqx3AKlyttIPb7J+XykHvJP2B9bZDjlhLIoEq4XoK64Vg7boZlVWYK6LUY94dYPEE7Lh0ZkZKcQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-data-descriptor": {
          "version": "1.0.0",
          "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-1.0.0.tgz",
          "integrity": "sha512-jbRXy1FmtAoCjQkVmIVYwuuqDFUbaOeDjmed1tOGPrsMhtJA4rD9tkgA0F1qJ3gRFRXcHYVkdeaP50Q5rE/jLQ==",
          "dev": true,
          "requires": {
            "kind-of": "^6.0.0"
          }
        },
        "is-descriptor": {
          "version": "1.0.2",
          "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-1.0.2.tgz",
          "integrity": "sha512-2eis5WqQGV7peooDyLmNEPUrps9+SXX5c9pL3xEB+4e9HnGuDa7mB7kHxHw4CbqS9k1T2hOH3miL8n8WtiYVtg==",
          "dev": true,
          "requires": {
            "is-accessor-descriptor": "^1.0.0",
            "is-data-descriptor": "^1.0.0",
            "kind-of": "^6.0.2"
          }
        }
      }
    },
    "base64-arraybuffer": {
      "version": "0.1.5",
      "resolved": "https://registry.npmjs.org/base64-arraybuffer/-/base64-arraybuffer-0.1.5.tgz",
      "integrity": "sha1-c5JncZI7Whl0etZmqlzUv5xunOg=",
      "dev": true
    },
    "base64-js": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.1.tgz",
      "integrity": "sha512-mLQ4i2QO1ytvGWFWmcngKO//JXAQueZvwEKtjgQFM4jIK0kU+ytMfplL8j+n5mspOfjHwoAg+9yhb7BwAHm36g==",
      "dev": true
    },
    "base64id": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/base64id/-/base64id-1.0.0.tgz",
      "integrity": "sha1-R2iMuZu2gE8OBtPnY7HDLlfY5rY=",
      "dev": true
    },
    "batch": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/batch/-/batch-0.6.1.tgz",
      "integrity": "sha1-3DQxT05nkxgJP8dgJyUl+UvyXBY=",
      "dev": true
    },
    "bcrypt-pbkdf": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/bcrypt-pbkdf/-/bcrypt-pbkdf-1.0.2.tgz",
      "integrity": "sha1-pDAdOJtqQ/m2f/PKEaP2Y342Dp4=",
      "dev": true,
      "requires": {
        "tweetnacl": "^0.14.3"
      }
    },
    "better-assert": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/better-assert/-/better-assert-1.0.2.tgz",
      "integrity": "sha1-QIZrnhueC1W0gYlDEeaPr/rrxSI=",
      "dev": true,
      "requires": {
        "callsite": "1.0.0"
      }
    },
    "big.js": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/big.js/-/big.js-5.2.2.tgz",
      "integrity": "sha512-vyL2OymJxmarO8gxMr0mhChsO9QGwhynfuu4+MHTAW6czfq9humCB7rKpUjDd9YUiDPU4mzpyupFSvOClAwbmQ=="
    },
    "binary-extensions": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-1.13.1.tgz",
      "integrity": "sha512-Un7MIEDdUC5gNpcGDV97op1Ywk748MpHcFTHoYs6qnj1Z3j7I53VG3nwZhKzoBZmbdRNnb6WRdFlwl7tSDuZGw==",
      "dev": true
    },
    "blob": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/blob/-/blob-0.0.5.tgz",
      "integrity": "sha512-gaqbzQPqOoamawKg0LGVd7SzLgXS+JH61oWprSLH+P+abTczqJbhTR8CmJ2u9/bUYNmHTGJx/UEmn6doAvvuig==",
      "dev": true
    },
    "blocking-proxy": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/blocking-proxy/-/blocking-proxy-1.0.1.tgz",
      "integrity": "sha512-KE8NFMZr3mN2E0HcvCgRtX7DjhiIQrwle+nSVJVC/yqFb9+xznHl2ZcoBp2L9qzkI4t4cBFJ1efXF8Dwi132RA==",
      "dev": true,
      "requires": {
        "minimist": "^1.2.0"
      }
    },
    "bluebird": {
      "version": "3.7.2",
      "resolved": "https://registry.npmjs.org/bluebird/-/bluebird-3.7.2.tgz",
      "integrity": "sha512-XpNj6GDQzdfW+r2Wnn7xiSAd7TM3jzkxGXBGTtWKuSXv1xUV+azxAm8jdWZN06QTQk+2N2XB9jRDkvbmQmcRtg==",
      "dev": true
    },
    "bn.js": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-5.1.2.tgz",
      "integrity": "sha512-40rZaf3bUNKTVYu9sIeeEGOg7g14Yvnj9kH7b50EiwX0Q7A6umbvfI5tvHaOERH0XigqKkfLkFQxzb4e6CIXnA==",
      "dev": true
    },
    "body-parser": {
      "version": "1.19.0",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.19.0.tgz",
      "integrity": "sha512-dhEPs72UPbDnAQJ9ZKMNTP6ptJaionhP5cBb541nXPlW60Jepo9RV/a4fX4XWW9CuFNK22krhrj1+rgzifNCsw==",
      "dev": true,
      "requires": {
        "bytes": "3.1.0",
        "content-type": "~1.0.4",
        "debug": "2.6.9",
        "depd": "~1.1.2",
        "http-errors": "1.7.2",
        "iconv-lite": "0.4.24",
        "on-finished": "~2.3.0",
        "qs": "6.7.0",
        "raw-body": "2.4.0",
        "type-is": "~1.6.17"
      },
      "dependencies": {
        "bytes": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.0.tgz",
          "integrity": "sha512-zauLjrfCG+xvoyaqLoV8bLVXXNGC4JqlxFCutSDWA6fJrTo2ZuvLYTqZ7aHBLZSMOopbzwv8f+wZcVzfVTI2Dg==",
          "dev": true
        },
        "qs": {
          "version": "6.7.0",
          "resolved": "https://registry.npmjs.org/qs/-/qs-6.7.0.tgz",
          "integrity": "sha512-VCdBRNFTX1fyE7Nb6FYoURo/SPe62QCaAyzJvUjwRaIsc+NePBEniHlvxFmmX56+HZphIGtV0XeCirBtpDrTyQ==",
          "dev": true
        }
      }
    },
    "bonjour": {
      "version": "3.5.0",
      "resolved": "https://registry.npmjs.org/bonjour/-/bonjour-3.5.0.tgz",
      "integrity": "sha1-jokKGD2O6aI5OzhExpGkK897yfU=",
      "dev": true,
      "requires": {
        "array-flatten": "^2.1.0",
        "deep-equal": "^1.0.1",
        "dns-equal": "^1.0.0",
        "dns-txt": "^2.0.2",
        "multicast-dns": "^6.0.1",
        "multicast-dns-service-types": "^1.1.0"
      }
    },
    "boolbase": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/boolbase/-/boolbase-1.0.0.tgz",
      "integrity": "sha1-aN/1++YMUes3cl6p4+0xDcwed24=",
      "dev": true
    },
    "boxen": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/boxen/-/boxen-4.2.0.tgz",
      "integrity": "sha512-eB4uT9RGzg2odpER62bBwSLvUeGC+WbRjjyyFhGsKnc8wp/m0+hQsMUvUe3H2V0D5vw0nBdO1hCJoZo5mKeuIQ==",
      "dev": true,
      "requires": {
        "ansi-align": "^3.0.0",
        "camelcase": "^5.3.1",
        "chalk": "^3.0.0",
        "cli-boxes": "^2.2.0",
        "string-width": "^4.1.0",
        "term-size": "^2.1.0",
        "type-fest": "^0.8.1",
        "widest-line": "^3.1.0"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
          "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg==",
          "dev": true
        },
        "ansi-styles": {
          "version": "4.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.2.1.tgz",
          "integrity": "sha512-9VGjrMsG1vePxcSweQsN20KY/c4zN0h9fLjqAbwbPfahM3t+NL+M9HC8xeXG2I8pX5NoamTGNuomEUFI7fcUjA==",
          "dev": true,
          "requires": {
            "@types/color-name": "^1.1.1",
            "color-convert": "^2.0.1"
          }
        },
        "chalk": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/chalk/-/chalk-3.0.0.tgz",
          "integrity": "sha512-4D3B6Wf41KOYRFdszmDqMCGq5VV/uMAB273JILmO+3jAlh8X4qDtdtgCR3fxtbLEMzSx22QdhnDcJvu2u1fVwg==",
          "dev": true,
          "requires": {
            "ansi-styles": "^4.1.0",
            "supports-color": "^7.1.0"
          }
        },
        "color-convert": {
          "version": "2.0.1",
          "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
          "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
          "dev": true,
          "requires": {
            "color-name": "~1.1.4"
          }
        },
        "color-name": {
          "version": "1.1.4",
          "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
          "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
          "dev": true
        },
        "has-flag": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
          "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
          "dev": true
        },
        "is-fullwidth-code-point": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
          "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
          "dev": true
        },
        "string-width": {
          "version": "4.2.0",
          "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.0.tgz",
          "integrity": "sha512-zUz5JD+tgqtuDjMhwIg5uFVV3dtqZ9yQJlZVfq4I01/K5Paj5UHj7VyrQOJvzawSVlKpObApbfD0Ed6yJc+1eg==",
          "dev": true,
          "requires": {
            "emoji-regex": "^8.0.0",
            "is-fullwidth-code-point": "^3.0.0",
            "strip-ansi": "^6.0.0"
          }
        },
        "strip-ansi": {
          "version": "6.0.0",
          "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.0.tgz",
          "integrity": "sha512-AuvKTrTfQNYNIctbR1K/YGTR1756GycPsg7b9bdV9Duqur4gv6aKqHXah67Z8ImS7WEz5QVcOtlfW2rZEugt6w==",
          "dev": true,
          "requires": {
            "ansi-regex": "^5.0.0"
          }
        },
        "supports-color": {
          "version": "7.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.1.0.tgz",
          "integrity": "sha512-oRSIpR8pxT1Wr2FquTNnGet79b3BWljqOuoW/h4oBhxJ/HUbX5nX6JSruTkvXDCFMwDPvsaTTbvMLKZWSy0R5g==",
          "dev": true,
          "requires": {
            "has-flag": "^4.0.0"
          }
        },
        "type-fest": {
          "version": "0.8.1",
          "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.8.1.tgz",
          "integrity": "sha512-4dbzIzqvjtgiM5rw1k5rEHtBANKmdudhGyBEajN01fEyhaAIhsoKNy6y7+IN93IfpFtwY9iqi7kD+xwKhQsNJA==",
          "dev": true
        }
      }
    },
    "brace-expansion": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.11.tgz",
      "integrity": "sha512-iCuPHDFgrHX7H2vEI/5xpz07zSHB00TpugqhmYtVmMO6518mCuRMoOYFldEBl0g187ufozdaHgWKcYFb61qGiA==",
      "dev": true,
      "requires": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "braces": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.2.tgz",
      "integrity": "sha512-b8um+L1RzM3WDSzvhm6gIz1yfTbBt6YTlcEKAvsmqCZZFw46z626lVj9j1yEPW33H5H+lBQpZMP1k8l+78Ha0A==",
      "dev": true,
      "requires": {
        "fill-range": "^7.0.1"
      }
    },
    "brorand": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/brorand/-/brorand-1.1.0.tgz",
      "integrity": "sha1-EsJe/kCkXjwyPrhnWgoM5XsiNx8=",
      "dev": true
    },
    "browserify-aes": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/browserify-aes/-/browserify-aes-1.2.0.tgz",
      "integrity": "sha512-+7CHXqGuspUn/Sl5aO7Ea0xWGAtETPXNSAjHo48JfLdPWcMng33Xe4znFvQweqc/uzk5zSOI3H52CYnjCfb5hA==",
      "dev": true,
      "requires": {
        "buffer-xor": "^1.0.3",
        "cipher-base": "^1.0.0",
        "create-hash": "^1.1.0",
        "evp_bytestokey": "^1.0.3",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "browserify-cipher": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/browserify-cipher/-/browserify-cipher-1.0.1.tgz",
      "integrity": "sha512-sPhkz0ARKbf4rRQt2hTpAHqn47X3llLkUGn+xEJzLjwY8LRs2p0v7ljvI5EyoRO/mexrNunNECisZs+gw2zz1w==",
      "dev": true,
      "requires": {
        "browserify-aes": "^1.0.4",
        "browserify-des": "^1.0.0",
        "evp_bytestokey": "^1.0.0"
      }
    },
    "browserify-des": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/browserify-des/-/browserify-des-1.0.2.tgz",
      "integrity": "sha512-BioO1xf3hFwz4kc6iBhI3ieDFompMhrMlnDFC4/0/vd5MokpuAc3R+LYbwTA9A5Yc9pq9UYPqffKpW2ObuwX5A==",
      "dev": true,
      "requires": {
        "cipher-base": "^1.0.1",
        "des.js": "^1.0.0",
        "inherits": "^2.0.1",
        "safe-buffer": "^5.1.2"
      }
    },
    "browserify-rsa": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/browserify-rsa/-/browserify-rsa-4.0.1.tgz",
      "integrity": "sha1-IeCr+vbyApzy+vsTNWenAdQTVSQ=",
      "dev": true,
      "requires": {
        "bn.js": "^4.1.0",
        "randombytes": "^2.0.1"
      },
      "dependencies": {
        "bn.js": {
          "version": "4.11.9",
          "resolved": "https://registry.npmjs.org/bn.js/-/bn.js-4.11.9.tgz",
          "integrity": "sha512-E6QoYqCKZfgatHTdHzs1RRKP7ip4vvm+EyRUeE2RF0NblwVvb0p6jSVeNTOFxPn26QXN2o6SMfNxKp6kU8zQaw==",
          "dev": true
        }
      }
    },
    "browserify-sign": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/browserify-sign/-/browserify-sign-4.2.0.tgz",
      "integrity": "sha512-hEZC1KEeYuoHRqhGhTy6gWrpJA3ZDjFWv0DE61643ZnOXAKJb3u7yWcrU0mMc9SwAqK1n7myPGndkp0dFG7NFA==",
      "dev": true,
      "requires": {
        "bn.js": "^5.1.1",
        "browserify-rsa": "^4.0.1",
        "create-hash": "^1.2.0",
        "create-hmac": "^1.1.7",
        "elliptic": "^6.5.2",
        "inherits": "^2.0.4",
        "parse-asn1": "^5.1.5",
        "readable-stream": "^3.6.0",
        "safe-buffer": "^5.2.0"
      },
      "dependencies": {
        "readable-stream": {
          "version": "3.6.0",
          "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.0.tgz",
          "integrity": "sha512-BViHy7LKeTz4oNnkcLJ+lVSL6vpiFeX6/d3oSH8zCW7UxP2onchk+vTGB143xuFjHS3deTgkKoXXymXqymiIdA==",
          "dev": true,
          "requires": {
            "inherits": "^2.0.3",
            "string_decoder": "^1.1.1",
            "util-deprecate": "^1.0.1"
          }
        },
        "safe-buffer": {
          "version": "5.2.1",
          "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
          "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
          "dev": true
        }
      }
    },
    "browserify-zlib": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/browserify-zlib/-/browserify-zlib-0.2.0.tgz",
      "integrity": "sha512-Z942RysHXmJrhqk88FmKBVq/v5tqmSkDz7p54G/MGyjMnCFFnC79XWNbg+Vta8W6Wb2qtSZTSxIGkJrRpCFEiA==",
      "dev": true,
      "requires": {
        "pako": "~1.0.5"
      }
    },
    "browserslist": {
      "version": "4.12.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.12.0.tgz",
      "integrity": "sha512-UH2GkcEDSI0k/lRkuDSzFl9ZZ87skSy9w2XAn1MsZnL+4c4rqbBd3e82UWHbYDpztABrPBhZsTEeuxVfHppqDg==",
      "dev": true,
      "requires": {
        "caniuse-lite": "^1.0.30001043",
        "electron-to-chromium": "^1.3.413",
        "node-releases": "^1.1.53",
        "pkg-up": "^2.0.0"
      }
    },
    "browserstack": {
      "version": "1.5.3",
      "resolved": "https://registry.npmjs.org/browserstack/-/browserstack-1.5.3.tgz",
      "integrity": "sha512-AO+mECXsW4QcqC9bxwM29O7qWa7bJT94uBFzeb5brylIQwawuEziwq20dPYbins95GlWzOawgyDNdjYAo32EKg==",
      "dev": true,
      "requires": {
        "https-proxy-agent": "^2.2.1"
      },
      "dependencies": {
        "agent-base": {
          "version": "4.3.0",
          "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-4.3.0.tgz",
          "integrity": "sha512-salcGninV0nPrwpGNn4VTXBb1SOuXQBiqbrNXoeizJsHrsL6ERFM2Ne3JUSBWRE6aeNJI2ROP/WEEIDUiDe3cg==",
          "dev": true,
          "requires": {
            "es6-promisify": "^5.0.0"
          }
        },
        "debug": {
          "version": "3.2.6",
          "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.6.tgz",
          "integrity": "sha512-mel+jf7nrtEl5Pn1Qx46zARXKDpBbvzezse7p7LqINmdoIk8PYP5SySaxEmYv6TZ0JyEKA1hsCId6DIhgITtWQ==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "https-proxy-agent": {
          "version": "2.2.4",
          "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-2.2.4.tgz",
          "integrity": "sha512-OmvfoQ53WLjtA9HeYP9RNrWMJzzAz1JGaSFr1nijg0PVR1JaD/xbJq1mdEIIlxGpXp9eSe/O2LgU9DJmTPd0Eg==",
          "dev": true,
          "requires": {
            "agent-base": "^4.3.0",
            "debug": "^3.1.0"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
          "dev": true
        }
      }
    },
    "browserstack-local": {
      "version": "1.4.5",
      "resolved": "https://registry.npmjs.org/browserstack-local/-/browserstack-local-1.4.5.tgz",
      "integrity": "sha512-0/VdSv2YVXmcnwBb64XThMvjM1HnZJnPdv7CUgQbC5y/N9Wsr0Fu+j1oknE9fC/VPx9CpoSC6CJ0kza42skMSA==",
      "dev": true,
      "requires": {
        "https-proxy-agent": "^4.0.0",
        "is-running": "^2.1.0",
        "ps-tree": "=1.2.0",
        "temp-fs": "^0.9.9"
      },
      "dependencies": {
        "agent-base": {
          "version": "5.1.1",
          "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-5.1.1.tgz",
          "integrity": "sha512-TMeqbNl2fMW0nMjTEPOwe3J/PRFP4vqeoNuQMG0HlMrtm5QxKqdvAkZ1pRBQ/ulIyDD5Yq0nJ7YbdD8ey0TO3g==",
          "dev": true
        },
        "debug": {
          "version": "4.1.1",
          "resolved": "https://registry.npmjs.org/debug/-/debug-4.1.1.tgz",
          "integrity": "sha512-pYAIzeRo8J6KPEaJ0VWOh5Pzkbw/RetuzehGM7QRRX5he4fPHx2rdKMB256ehJCkX+XRQm16eZLqLNS8RSZXZw==",
          "dev": true,
          "requires": {
            "ms": "^2.1.1"
          }
        },
        "https-proxy-agent": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-4.0.0.tgz",
          "integrity": "sha512-zoDhWrkR3of1l9QAL8/scJZyLu8j/gBkcwcaQOZh7Gyh/+uJQzGVETdgT30akuwkpL8HTRfssqI3BZuV18teDg==",
          "dev": true,
          "requires": {
            "agent-base": "5",
            "debug": "4"
          }
        },
        "ms": {
          "version": "2.1.2",
          "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.2.tgz",
          "integrity": "sha512-sGkPx+VjMtmA6MX27oA4FBFELFCZZ4S4XqeGOXCv68tT+jb3vk/RyaKWP0PTKyWtmLSM0b+adUTEvbs1PEaH2w==",
          "dev": true
        }
      }
    },
    "buffer": {
      "version": "4.9.2",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-4.9.2.tgz",
      "integrity": "sha512-xq+q3SRMOxGivLhBNaUdC64hDTQwejJ+H0T/NB1XMtTVEwNTrfFF3gAxiyW0Bu/xWEGhjVKgUcMhCrUy2+uCWg==",
      "dev": true,
      "requires": {
        "base64-js": "^1.0.2",
        "ieee754": "^1.1.4",
        "isarray": "^1.0.0"
      }
    },
    "buffer-crc32": {
      "version": "0.2.13",
      "resolved": "https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.13.tgz",
      "integrity": "sha1-DTM+PwDqxQqhRUq9MO+MKl2ackI=",
      "dev": true
    },
    "buffer-equal": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/buffer-equal/-/buffer-equal-1.0.0.tgz",
      "integrity": "sha1-WWFrSYME1Var1GaWayLu2j7KX74=",
      "dev": true
    },
    "buffer-from": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.1.tgz",
      "integrity": "sha512-MQcXEUbCKtEo7bhqEs6560Hyd4XaovZlO/k9V3hjVUF/zwW7KBVdSK4gIt/bzwS9MbR5qob+F5jusZsb0YQK2A==",
      "dev": true
    },
    "buffer-indexof": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/buffer-indexof/-/buffer-indexof-1.1.1.tgz",
      "integrity": "sha512-4/rOEg86jivtPTeOUUT61jJO1Ya1TrR/OkqCSZDyq84WJh3LuuiphBYJN+fm5xufIk4XAFcEwte/8WzC8If/1g==",
      "dev": true
    },
    "buffer-xor": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/buffer-xor/-/buffer-xor-1.0.3.tgz",
      "integrity": "sha1-JuYe0UIvtw3ULm42cp7VHYVf6Nk=",
      "dev": true
    },
    "builtin-modules": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/builtin-modules/-/builtin-modules-3.1.0.tgz",
      "integrity": "sha512-k0KL0aWZuBt2lrxrcASWDfwOLMnodeQjodT/1SxEQAXsHANgo6ZC/VEaSEHCXt7aSTZ4/4H5LKa+tBXmW7Vtvw==",
      "dev": true
    },
    "builtin-status-codes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/builtin-status-codes/-/builtin-status-codes-3.0.0.tgz",
      "integrity": "sha1-hZgoeOIbmOHGZCXgPQF0eI9Wnug=",
      "dev": true
    },
    "builtins": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/builtins/-/builtins-1.0.3.tgz",
      "integrity": "sha1-y5T662HIaWRR2zZTThQi+U8K7og=",
      "dev": true
    },
    "bytes": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.0.0.tgz",
      "integrity": "sha1-0ygVQE1olpn4Wk6k+odV3ROpYEg=",
      "dev": true
    },
    "cacache": {
      "version": "15.0.0",
      "resolved": "https://registry.npmjs.org/cacache/-/cacache-15.0.0.tgz",
      "integrity": "sha512-L0JpXHhplbJSiDGzyJJnJCTL7er7NzbBgxzVqLswEb4bO91Zbv17OUMuUeu/q0ZwKn3V+1HM4wb9tO4eVE/K8g==",
      "dev": true,
      "requires": {
        "chownr": "^1.1.2",
        "fs-minipass": "^2.0.0",
        "glob": "^7.1.4",
        "infer-owner": "^1.0.4",
        "lru-cache": "^5.1.1",
        "minipass": "^3.1.1",
        "minipass-collect": "^1.0.2",
        "minipass-flush": "^1.0.5",
        "minipass-pipeline": "^1.2.2",
        "mkdirp": "^1.0.3",
        "move-concurrently": "^1.0.1",
        "p-map": "^3.0.0",
        "promise-inflight": "^1.0.1",
        "rimraf": "^2.7.1",
        "ssri": "^8.0.0",
        "tar": "^6.0.1",
        "unique-filename": "^1.1.1"
      },
      "dependencies": {
        "glob": {
          "version": "7.1.6",
          "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.6.tgz",
          "integrity": "sha512-LwaxwyZ72Lk7vZINtNNrywX0ZuLyStrdDtabefZKAY5ZGJhVtgdznluResxNmPitE0SAO+O26sWTHeKSI2wMBA==",
          "dev": true,
          "requires": {
            "fs.realpath": "^1.0.0",
            "inflight": "^1.0.4",
            "inherits": "2",
            "minimatch": "^3.0.4",
            "once": "^1.3.0",
            "path-is-absolute": "^1.0.0"
          },
          "dependencies": {
            "fs.realpath": {
              "version": "1.0.0",
              "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
              "integrity": "sha1-FQStJSMVjKpA20onh8sBQRmU6k8=",
              "dev": true
            },
            "inflight": {
              "version": "1.0.6",
              "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
              "integrity": "sha1-Sb1jMdfQLQwJvJEKEHW6gWW1bfk=",
              "dev": true,
              "requires": {
                "once": "^1.3.0",
                "wrappy": "1"
              }
            }
          }
        },
        "minipass": {
          "version": "3.1.3",
          "resolved": "https://registry.npmjs.org/minipass/-/minipass-3.1.3.tgz",
          "integrity": "sha512-Mgd2GdMVzY+x3IJ+oHnVM+KG3lA5c8tnabyJKmHSaG2kAGpudxuOf8ToDkhumF7UzME7DecbQE9uOZhNm7PuJg==",
          "dev": true,
          "requires": {
            "yallist": "^4.0.0"
          }
        },
        "mkdirp": {
          "version": "1.0.4",
          "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
          "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw==",
          "dev": true
        }
      }
    },
    "cache-base": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/cache-base/-/cache-base-1.0.1.tgz",
      "integrity": "sha512-AKcdTnFSWATd5/GCPRxr2ChwIJ85CeyrEyjRHlKxQ56d4XJMGym0uAiKn0xbLOGOl3+yRpOTi484dVCEc5AUzQ==",
      "dev": true,
      "requires": {
        "collection-visit": "^1.0.0",
        "component-emitter": "^1.2.1",
        "get-value": "^2.0.6",
        "has-value": "^1.0.0",
        "isobject": "^3.0.1",
        "set-value": "^2.0.0",
        "to-object-path": "^0.3.0",
        "union-value": "^1.0.0",
        "unset-value": "^1.0.0"
      }
    },
    "cacheable-request": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/cacheable-request/-/cacheable-request-6.1.0.tgz",
      "integrity": "sha512-Oj3cAGPCqOZX7Rz64Uny2GYAZNliQSqfbePrgAQ1wKAihYmCUnraBtJtKcGR4xz7wF+LoJC+ssFZvv5BgF9Igg==",
      "dev": true,
      "requires": {
        "clone-response": "^1.0.2",
        "get-stream": "^5.1.0",
        "http-cache-semantics": "^4.0.0",
        "keyv": "^3.0.0",
        "lowercase-keys": "^2.0.0",
        "normalize-url": "^4.1.0",
        "responselike": "^1.0.2"
      },
      "dependencies": {
        "get-stream": {
          "version": "5.1.0",
          "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-5.1.0.tgz",
          "integrity": "sha512-EXr1FOzrzTfGeL0gQdeFEvOMm2mzMOglyiOXSTpPC+iAjAKftbr3jpCMWynogwYnM+eSj9sHGc6wjIcDvYiygw==",
          "dev": true,
          "requires": {
            "pump": "^3.0.0"
          }
        },
        "http-cache-semantics": {
          "version": "4.1.0",
          "resolved": "https://registry.npmjs.org/http-cache-semantics/-/http-cache-semantics-4.1.0.tgz",
          "integrity": "sha512-carPklcUh7ROWRK7Cv27RPtdhYhUsela/ue5/jKzjegVvXDqM2ILE9Q2BGn9JZJh1g87cp56su/FgQSzcWS8cQ==",
          "dev": true
        },
        "lowercase-keys": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/lowercase-keys/-/lowercase-keys-2.0.0.tgz",
          "integrity": "sha512-tqNXrS78oMOE73NMxK4EMLQsQowWf8jKooH9g7xPavRT706R6bkQJ6DY2Te7QukaZsulxa30wQ7bk0pm4XiHmA==",
          "dev": true
        },
        "normalize-url": {
          "version": "4.5.0",
          "resolved": "https://registry.npmjs.org/normalize-url/-/normalize-url-4.5.0.tgz",
          "integrity": "sha512-2s47yzUxdexf1OhyRi4Em83iQk0aPvwTddtFz4hnSSw9dCEsLEGf6SwIO8ss/19S9iBb5sJaOuTvTGDeZI00BQ==",
          "dev": true
        },
        "pump": {
          "version": "3.0.0",
          "resolved": "https://registry.npmjs.org/pump/-/pump-3.0.0.tgz",
          "integrity": "sha512-LwZy+p3SFs1Pytd/jYct4wpv49HiYCqd9Rlc5ZVdk0V+8Yzv6jR5Blk3TRmPL1ft69TxP0IMZGJ+WPFU2BFhww==",
          "dev": true,
          "requires": {
            "end-of-stream": "^1.1.0",
            "once": "^1.3.1"
          }
        }
      }
    },
    "caching-transform": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/caching-transform/-/caching-transform-4.0.0.tgz",
      "integrity": "sha512-kpqOvwXnjjN44D89K5ccQC+RUrsy7jB/XLlRrx0D7/2HNcTPqzsb6XgYoErwko6QsV184CA2YgS1fxDiiDZMWA==",
      "dev": true,
      "requires": {
        "hasha": "^5.0.0",
        "make-dir": "^3.0.0",
        "package-hash": "^4.0.0",
        "write-file-atomic": "^3.0.0"
      },
      "dependencies": {
        "make-dir": {
          "version": "3.1.0",
          "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-3.1.0.tgz",
          "integrity": "sha512-g3FeP20LNwhALb/6Cz6Dd4F2ngze0jz7tbzrD2wAV+o9FeNHe4rL+yK2md0J/fiSf1sa1ADhXqi5+oVwOM/eGw==",
          "dev": true,
          "requires": {
            "semver": "^6.0.0"
          }
        },
        "semver": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
          "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw==",
          "dev": true
        }
      }
    },
    "call-me-maybe": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/call-me-maybe/-/call-me-maybe-1.0.1.tgz",
      "integrity": "sha1-JtII6onje1y95gJQoV8DHBak1ms=",
      "dev": true
    },
    "caller-callsite": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/caller-callsite/-/caller-callsite-2.0.0.tgz",
      "integrity": "sha1-hH4PzgoiN1CpoCfFSzNzGtMVQTQ=",
      "dev": true,
      "requires": {
        "callsites": "^2.0.0"
      }
    },
    "caller-path": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/caller-path/-/caller-path-2.0.0.tgz",
      "integrity": "sha1-Ro+DBE42mrIBD6xfBs7uFbsssfQ=",
      "dev": true,
      "requires": {
        "caller-callsite": "^2.0.0"
      }
    },
    "callsite": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/callsite/-/callsite-1.0.0.tgz",
      "integrity": "sha1-KAOY5dZkvXQDi28JBRU+borxvCA=",
      "dev": true
    },
    "callsites": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-2.0.0.tgz",
      "integrity": "sha1-BuuE8A7qQT2oav/vrL/7Ngk7PFA=",
      "dev": true
    },
    "camelcase": {
      "version": "5.3.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
      "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg==",
      "dev": true
    },
    "caniuse-api": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/caniuse-api/-/caniuse-api-3.0.0.tgz",
      "integrity": "sha512-bsTwuIg/BZZK/vreVTYYbSWoe2F+71P7K5QGEX+pT250DZbfU1MQ5prOKpPR+LL6uWKK3KMwMCAS74QB3Um1uw==",
      "dev": true,
      "requires": {
        "browserslist": "^4.0.0",
        "caniuse-lite": "^1.0.0",
        "lodash.memoize": "^4.1.2",
        "lodash.uniq": "^4.5.0"
      }
    },
    "caniuse-lite": {
      "version": "1.0.30001079",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001079.tgz",
      "integrity": "sha512-2KaYheg0iOY+CMmDuAB3DHehrXhhb4OZU4KBVGDr/YKyYAcpudaiUQ9PJ9rxrPlKEoJ3ATasQ5AN48MqpwS43Q==",
      "dev": true
    },
    "canonical-path": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/canonical-path/-/canonical-path-1.0.0.tgz",
      "integrity": "sha512-feylzsbDxi1gPZ1IjystzIQZagYYLvfKrSuygUCgf7z6x790VEzze5QEkdSV1U58RA7Hi0+v6fv4K54atOzATg==",
      "dev": true
    },
    "caseless": {
      "version": "0.12.0",
      "resolved": "https://registry.npmjs.org/caseless/-/caseless-0.12.0.tgz",
      "integrity": "sha1-G2gcIf+EAzyCZUMJBolCDRhxUdw=",
      "dev": true
    },
    "chalk": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-2.4.2.tgz",
      "integrity": "sha512-Mti+f9lpJNcwF4tWV8/OrTTtF1gZi+f8FqlyAdouralcFWFQWF2+NgCHShjkCb+IFBLq9buZwE1xckQU4peSuQ==",
      "dev": true,
      "requires": {
        "ansi-styles": "^3.2.1",
        "escape-string-regexp": "^1.0.5",
        "supports-color": "^5.3.0"
      },
      "dependencies": {
        "supports-color": {
          "version": "5.5.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-5.5.0.tgz",
          "integrity": "sha512-QjVjwdXIt408MIiAqCX4oUKsgU2EqAGzs2Ppkm4aQYbjm+ZEWEcW4SfFNTr4uMNZma0ey4f5lgLrkB0aX0QMow==",
          "dev": true,
          "requires": {
            "has-flag": "^3.0.0"
          }
        }
      }
    },
    "chardet": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/chardet/-/chardet-0.7.0.tgz",
      "integrity": "sha512-mT8iDcrh03qDGRRmoA2hmBJnxpllMR+0/0qlzjqZES6NdiWDcZkCNAk4rPFZ9Q85r27unkiNNg8ZOiwZXBHwcA==",
      "dev": true
    },
    "chokidar": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.4.0.tgz",
      "integrity": "sha512-aXAaho2VJtisB/1fg1+3nlLJqGOuewTzQpd/Tz0yTg2R0e4IGtshYvtjowyEumcBv2z+y4+kc75Mz7j5xJskcQ==",
      "dev": true,
      "requires": {
        "anymatch": "~3.1.1",
        "braces": "~3.0.2",
        "fsevents": "~2.1.2",
        "glob-parent": "~5.1.0",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.4.0"
      },
      "dependencies": {
        "glob-parent": {
          "version": "5.1.1",
          "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.1.tgz",
          "integrity": "sha512-FnI+VGOpnlGHWZxthPGR+QhR78fuiK0sNLkHQv+bL9fQi57lNNdquIbna/WrfROrolq8GK5Ek6BiMwqL/voRYQ==",
          "dev": true,
          "requires": {
            "is-glob": "^4.0.1"
          }
        }
      }
    },
    "chownr": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/chownr/-/chownr-1.1.4.tgz",
      "integrity": "sha512-jJ0bqzaylmJtVnNgzTeSOs8DPavpbYgEr/b0YL8/2GO3xJEhInFmhKMUnEJQjZumK7KXGFhUy89PrsJWlakBVg==",
      "dev": true
    },
    "chrome-trace-event": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/chrome-trace-event/-/chrome-trace-event-1.0.2.tgz",
      "integrity": "sha512-9e/zx1jw7B4CO+c/RXoCsfg/x1AfUBioy4owYH0bJprEYAx5hRFLRhWBqHAG57D0ZM4H7vxbP7bPe0VwhQRYDQ==",
      "dev": true,
      "requires": {
        "tslib": "^1.9.0"
      }
    },
    "ci-info": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ci-info/-/ci-info-2.0.0.tgz",
      "integrity": "sha512-5tK7EtrZ0N+OLFMthtqOj4fI2Jeb88C4CAZPu25LDVUgXJ0A3Js4PMGqrn0JU1W0Mh1/Z8wZzYPxqUrXeBboCQ==",
      "dev": true
    },
    "cipher-base": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/cipher-base/-/cipher-base-1.0.4.tgz",
      "integrity": "sha512-Kkht5ye6ZGmwv40uUDZztayT2ThLQGfnj/T71N/XzeZeo3nf8foyW7zGTsPYkEya3m5f3cAypH+qe7YOrM1U2Q==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "circular-dependency-plugin": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/circular-dependency-plugin/-/circular-dependency-plugin-5.2.0.tgz",
      "integrity": "sha512-7p4Kn/gffhQaavNfyDFg7LS5S/UT1JAjyGd4UqR2+jzoYF02eDkj0Ec3+48TsIa4zghjLY87nQHIh/ecK9qLdw==",
      "dev": true
    },
    "circular-json": {
      "version": "0.5.9",
      "resolved": "https://registry.npmjs.org/circular-json/-/circular-json-0.5.9.tgz",
      "integrity": "sha512-4ivwqHpIFJZBuhN3g/pEcdbnGUywkBblloGbkglyloVjjR3uT6tieI89MVOfbP2tHX5sgb01FuLgAOzebNlJNQ=="
    },
    "class-utils": {
      "version": "0.3.6",
      "resolved": "https://registry.npmjs.org/class-utils/-/class-utils-0.3.6.tgz",
      "integrity": "sha512-qOhPa/Fj7s6TY8H8esGu5QNpMMQxz79h+urzrNYN6mn+9BnxlDGf5QZ+XeCDsxSjPqsSR56XOZOJmpeurnLMeg==",
      "dev": true,
      "requires": {
        "arr-union": "^3.1.0",
        "define-property": "^0.2.5",
        "isobject": "^3.0.0",
        "static-extend": "^0.1.1"
      },
      "dependencies": {
        "define-property": {
          "version": "0.2.5",
          "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",
          "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",
          "dev": true,
          "requires": {
            "is-descriptor": "^0.1.0"
          }
        }
      }
    },
    "clean-css": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/clean-css/-/clean-css-4.2.3.tgz",
      "integrity": "sha512-VcMWDN54ZN/DS+g58HYL5/n4Zrqe8vHJpGA8KdgUXFU4fuP/aHNw8eld9SyEIyabIMJX/0RaY/fplOo5hYLSFA==",
      "dev": true,
      "requires": {
        "source-map": "~0.6.0"
      },
      "dependencies": {
        "source-map": {
          "version": "0.6.1",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
          "dev": true
        }
      }
    },
    "clean-stack": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/clean-stack/-/clean-stack-2.2.0.tgz",
      "integrity": "sha512-4diC9HaTE+KRAMWhDhrGOECgWZxoevMc5TlkObMqNSsVU62PYzXZ/SMTjzyGAFF1YusgxGcSWTEXBhp0CPwQ1A==",
      "dev": true
    },
    "cli-boxes": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/cli-boxes/-/cli-boxes-2.2.0.tgz",
      "integrity": "sha512-gpaBrMAizVEANOpfZp/EEUixTXDyGt7DFzdK5hU+UbWt/J0lB0w20ncZj59Z9a93xHb9u12zF5BS6i9RKbtg4w==",
      "dev": true
    },
    "cli-color": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/cli-color/-/cli-color-2.0.0.tgz",
      "integrity": "sha512-a0VZ8LeraW0jTuCkuAGMNufareGHhyZU9z8OGsW0gXd1hZGi1SRuNRXdbGkraBBKnhyUhyebFWnRbp+dIn0f0A==",
      "dev": true,
      "requires": {
        "ansi-regex": "^2.1.1",
        "d": "^1.0.1",
        "es5-ext": "^0.10.51",
        "es6-iterator": "^2.0.3",
        "memoizee": "^0.4.14",
        "timers-ext": "^0.1.7"
      }
    },
    "cli-cursor": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-3.1.0.tgz",
      "integrity": "sha512-I/zHAwsKf9FqGoXM4WWRACob9+SNukZTd94DWF57E4toouRulbCxcUh6RKUEOQlYTHJnzkPMySvPNaaSLNfLZw==",
      "dev": true,
      "requires": {
        "restore-cursor": "^3.1.0"
      }
    },
    "cli-spinners": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.3.0.tgz",
      "integrity": "sha512-Xs2Hf2nzrvJMFKimOR7YR0QwZ8fc0u98kdtwN1eNAZzNQgH3vK2pXzff6GJtKh7S5hoJ87ECiAiZFS2fb5Ii2w==",
      "dev": true
    },
    "cli-width": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/cli-width/-/cli-width-2.2.0.tgz",
      "integrity": "sha1-/xnt6Kml5XkyQUewwR8PvLq+1jk=",
      "dev": true
    },
    "cliui": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-3.2.0.tgz",
      "integrity": "sha1-EgYBU3qRbSmUD5NNo7SNWFo5IT0=",
      "dev": true,
      "requires": {
        "string-width": "^1.0.1",
        "strip-ansi": "^3.0.1",
        "wrap-ansi": "^2.0.0"
      },
      "dependencies": {
        "wrap-ansi": {
          "version": "2.1.0",
          "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-2.1.0.tgz",
          "integrity": "sha1-2Pw9KE3QV5T+hJc8rs3Rz4JP3YU=",
          "dev": true,
          "requires": {
            "string-width": "^1.0.1",
            "strip-ansi": "^3.0.1"
          }
        }
      }
    },
    "clone": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/clone/-/clone-2.1.2.tgz",
      "integrity": "sha1-G39Ln1kfHo+DZwQBYANFoCiHQ18=",
      "dev": true
    },
    "clone-buffer": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/clone-buffer/-/clone-buffer-1.0.0.tgz",
      "integrity": "sha1-4+JbIHrE5wGvch4staFnksrD3Fg=",
      "dev": true
    },
    "clone-deep": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/clone-deep/-/clone-deep-4.0.1.tgz",
      "integrity": "sha512-neHB9xuzh/wk0dIHweyAXv2aPGZIVk3pLMe+/RNzINf17fe0OG96QroktYAUm7SM1PBnzTabaLboqqxDyMU+SQ==",
      "dev": true,
      "requires": {
        "is-plain-object": "^2.0.4",
        "kind-of": "^6.0.2",
        "shallow-clone": "^3.0.0"
      }
    },
    "clone-response": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/clone-response/-/clone-response-1.0.2.tgz",
      "integrity": "sha1-0dyXOSAxTfZ/vrlCI7TuNQI56Ws=",
      "dev": true,
      "requires": {
        "mimic-response": "^1.0.0"
      }
    },
    "clone-stats": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/clone-stats/-/clone-stats-1.0.0.tgz",
      "integrity": "sha1-s3gt/4u1R04Yuba/D9/ngvh3doA=",
      "dev": true
    },
    "cloneable-readable": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/cloneable-readable/-/cloneable-readable-1.1.3.tgz",
      "integrity": "sha512-2EF8zTQOxYq70Y4XKtorQupqF0m49MBz2/yf5Bj+MHjvpG3Hy7sImifnqD6UA+TKYxeSV+u6qqQPawN5UvnpKQ==",
      "dev": true,
      "requires": {
        "inherits": "^2.0.1",
        "process-nextick-args": "^2.0.0",
        "readable-stream": "^2.3.5"
      }
    },
    "co": {
      "version": "4.6.0",
      "resolved": "https://registry.npmjs.org/co/-/co-4.6.0.tgz",
      "integrity": "sha1-bqa989hTrlTMuOR7+gvz+QMfsYQ=",
      "dev": true
    },
    "coa": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/coa/-/coa-2.0.2.tgz",
      "integrity": "sha512-q5/jG+YQnSy4nRTV4F7lPepBJZ8qBNJJDBuJdoejDyLXgmL7IEo+Le2JDZudFTFt7mrCqIRaSjws4ygRCTCAXA==",
      "dev": true,
      "requires": {
        "@types/q": "^1.5.1",
        "chalk": "^2.4.1",
        "q": "^1.1.2"
      }
    },
    "code-point-at": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/code-point-at/-/code-point-at-1.1.0.tgz",
      "integrity": "sha1-DQcLTQQ6W+ozovGkDi7bPZpMz3c=",
      "dev": true
    },
    "codecov": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/codecov/-/codecov-3.7.0.tgz",
      "integrity": "sha512-uIixKofG099NbUDyzRk1HdGtaG8O+PBUAg3wfmjwXw2+ek+PZp+puRvbTohqrVfuudaezivJHFgTtSC3M8MXww==",
      "dev": true,
      "requires": {
        "argv": "0.0.2",
        "ignore-walk": "3.0.3",
        "js-yaml": "3.13.1",
        "teeny-request": "6.0.1",
        "urlgrey": "0.4.4"
      }
    },
    "codelyzer": {
      "version": "5.2.2",
      "resolved": "https://registry.npmjs.org/codelyzer/-/codelyzer-5.2.2.tgz",
      "integrity": "sha512-jB4FZ1Sx7kZhvZVdf+N2BaKTdrrNZOL0Bj10RRfrhHrb3zEvXjJvvq298JPMJAiyiCS/v4zs1QlGU0ip7xGqeA==",
      "dev": true,
      "requires": {
        "app-root-path": "^2.2.1",
        "aria-query": "^3.0.0",
        "axobject-query": "2.0.2",
        "css-selector-tokenizer": "^0.7.1",
        "cssauron": "^1.4.0",
        "damerau-levenshtein": "^1.0.4",
        "semver-dsl": "^1.0.1",
        "source-map": "^0.5.7",
        "sprintf-js": "^1.1.2"
      },
      "dependencies": {
        "source-map": {
          "version": "0.5.7",
          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.5.7.tgz",
          "integrity": "sha1-igOdLRAh0i0eoUyA2OpGi6LvP8w=",
          "dev": true
        },
        "sprintf-js": {
          "version": "1.1.2",
          "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.1.2.tgz",
          "integrity": "sha512-VE0SOVEHCk7Qc8ulkWw3ntAzXuqf7S2lvwQaDLRnUeIEaKNQJzV6BwmLKhOqT61aGhfUMrXeaBk+oDGCzvhcug==",
          "dev": true
        }
      }
    },
    "collection-map": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/collection-map/-/collection-map-1.0.0.tgz",
      "integrity": "sha1-rqDwb40mx4DCt1SUOFVEsiVa8Yw=",
      "dev": true,
      "requires": {
        "arr-map": "^2.0.2",
        "for-own": "^1.0.0",
        "make-iterator": "^1.0.0"
      }
    },
    "collection-visit": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/collection-visit/-/collection-visit-1.0.0.tgz",
      "integrity": "sha1-S8A3PBZLwykbTTaMgpzxqApZ3KA=",
      "dev": true,
      "requires": {
        "map-visit": "^1.0.0",
        "object-visit": "^1.0.0"
      }
    },
    "color": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/color/-/color-3.1.2.tgz",
      "integrity": "sha512-vXTJhHebByxZn3lDvDJYw4lR5+uB3vuoHsuYA5AKuxRVn5wzzIfQKGLBmgdVRHKTJYeK5rvJcHnrd0Li49CFpg==",
      "dev": true,
      "requires": {
        "color-convert": "^1.9.1",
        "color-string": "^1.5.2"
      }
    },
    "color-convert": {
      "version": "1.9.3",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-1.9.3.tgz",
      "integrity": "sha512-QfAUtd+vFdAtFQcC8CCyYt1fYWxSqAiK2cSD6zDB8N3cpsEBAvRxp9zOGg6G/SHHJYAT88/az/IuDGALsNVbGg==",
      "dev": true,
      "requires": {
        "color-name": "1.1.3"
      }
    },
    "color-name": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.3.tgz",
      "integrity": "sha1-p9BVi9icQveV3UIyj3QIMcpTvCU=",
      "dev": true
    },
    "color-string": {
      "version": "1.5.3",
      "resolved": "https://registry.npmjs.org/color-string/-/color-string-1.5.3.tgz",
      "integrity": "sha512-dC2C5qeWoYkxki5UAXapdjqO672AM4vZuPGRQfO8b5HKuKGBbKWpITyDYN7TOFKvRW7kOgAn3746clDBMDJyQw==",
      "dev": true,
      "requires": {
        "color-name": "^1.0.0",
        "simple-swizzle": "^0.2.2"
      }
    },
    "color-support": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/color-support/-/color-support-1.1.3.tgz",
      "integrity": "sha512-qiBjkpbMLO/HL68y+lh4q0/O1MZFj2RX6X/KmMa3+gJD3z+WwI1ZzDHysvqHGS3mP6mznPckpXmw1nI9cJjyRg==",
      "dev": true
    },
    "colors": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/colors/-/colors-1.1.2.tgz",
      "integrity": "sha1-FopHAXVran9RoSzgyXv6KMCE7WM=",
      "dev": true
    },
    "combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "dev": true,
      "requires": {
        "delayed-stream": "~1.0.0"
      }
    },
    "commander": {
      "version": "2.20.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-2.20.0.tgz",
      "integrity": "sha512-7j2y+40w61zy6YC2iRNpUe/NwhNyoXrYpHMrSunaMG64nRnaf96zO/KMQR4OyN/UnE5KLyEBnKHd4aG3rskjpQ==",
      "dev": true
    },
    "commondir": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/commondir/-/commondir-1.0.1.tgz",
      "integrity": "sha1-3dgA2gxmEnOTzKWVDqloo6rxJTs=",
      "dev": true
    },
    "compare-versions": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/compare-versions/-/compare-versions-3.6.0.tgz",
      "integrity": "sha512-W6Af2Iw1z4CB7q4uU4hv646dW9GQuBM+YpC0UvUCWSD8w90SJjp+ujJuXaEMtAXBtSqGfMPuFOVn4/+FlaqfBA==",
      "dev": true
    },
    "component-bind": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/component-bind/-/component-bind-1.0.0.tgz",
      "integrity": "sha1-AMYIq33Nk4l8AAllGx06jh5zu9E=",
      "dev": true
    },
    "component-emitter": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/component-emitter/-/component-emitter-1.3.0.tgz",
      "integrity": "sha512-Rd3se6QB+sO1TwqZjscQrurpEPIfO0/yYnSin6Q/rD3mOutHvUrCAhJub3r90uNb+SESBuE0QYoB90YdfatsRg==",
      "dev": true
    },
    "component-inherit": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/component-inherit/-/component-inherit-0.0.3.tgz",
      "integrity": "sha1-ZF/ErfWLcrZJ1crmUTVhnbJv8UM=",
      "dev": true
    },
    "compressible": {
      "version": "2.0.18",
      "resolved": "https://registry.npmjs.org/compressible/-/compressible-2.0.18.tgz",
      "integrity": "sha512-AF3r7P5dWxL8MxyITRMlORQNaOA2IkAFaTr4k7BUumjPtRpGDTZpl0Pb1XCO6JeDCBdp126Cgs9sMxqSjgYyRg==",
      "dev": true,
      "requires": {
        "mime-db": ">= 1.43.0 < 2"
      }
    },
    "compression": {
      "version": "1.7.4",
      "resolved": "https://registry.npmjs.org/compression/-/compression-1.7.4.tgz",
      "integrity": "sha512-jaSIDzP9pZVS4ZfQ+TzvtiWhdpFhE2RDHz8QJkpX9SIpLq88VueF5jJw6t+6CUQcAoA6t+x89MLrWAqpfDE8iQ==",
      "dev": true,
      "requires": {
        "accepts": "~1.3.5",
        "bytes": "3.0.0",
        "compressible": "~2.0.16",
        "debug": "2.6.9",
        "on-headers": "~1.0.2",
        "safe-buffer": "5.1.2",
        "vary": "~1.1.2"
      }
    },
    "concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha1-2Klr13/Wjfd5OnMDajug1UBdR3s=",
      "dev": true
    },
    "concat-stream": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-1.6.2.tgz",
      "integrity": "sha512-27HBghJxjiZtIk3Ycvn/4kbJk/1uZuJFfuPEns6LaEvpvG1f0hTea8lilrouyo9mVc2GWdcEZ8OLoGmSADlrCw==",
      "dev": true,
      "requires": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^2.2.2",
        "typedarray": "^0.0.6"
      }
    },
    "configstore": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/configstore/-/configstore-5.0.1.tgz",
      "integrity": "sha512-aMKprgk5YhBNyH25hj8wGt2+D52Sw1DRRIzqBwLp2Ya9mFmY8KPvvtvmna8SxVR9JMZ4kzMD68N22vlaRpkeFA==",
      "dev": true,
      "requires": {
        "dot-prop": "^5.2.0",
        "graceful-fs": "^4.1.2",
        "make-dir": "^3.0.0",
        "unique-string": "^2.0.0",
        "write-file-atomic": "^3.0.0",
        "xdg-basedir": "^4.0.0"
      },
      "dependencies": {
        "make-dir": {
          "version": "3.0.2",
          "resolved": "https://registry.npmjs.org/make-dir/-/make-dir-3.0.2.tgz",
          "integrity": "sha512-rYKABKutXa6vXTXhoV18cBE7PaewPXHe/Bdq4v+ZLMhxbWApkFFplT0LcbMW+6BbjnQXzZ/sAvSE/JdguApG5w==",
          "dev": true,
          "requires": {
            "semver": "^6.0.0"
          }
        },
        "semver": {
          "version": "6.3.0",
          "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.0.tgz",
          "integrity": "sha512-b39TBaTSfV6yBrapU89p5fKekE2m/NwnDocOVruQFS1/veMgdzuPcnOM34M6CwxW8jH/lxEa5rBoDeUwu5HHTw==",
          "dev": true
        }
      }
    },
    "connect": {
      "version": "3.7.0",
      "resolved": "https://registry.npmjs.org/connect/-/connect-3.7.0.tgz",
      "integrity": "sha512-ZqRXc+tZukToSNmh5C2iWMSoV3X1YUcPbqEM4DkEG5tNQXrQUZCNVGGv3IuicnkMtPfGf3Xtp8WCXs295iQ1pQ==",
      "dev": true,
      "requires": {
        "debug": "2.6.9",
        "finalhandler": "1.1.2",
        "parseurl": "~1.3.3",
        "utils-merge": "1.0.1"
      }
    },
    "connect-history-api-fallback": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/connect-history-api-fallback/-/connect-history-api-fallback-1.6.0.tgz",
      "integrity": "sha512-e54B99q/OUoH64zYYRf3HBP5z24G38h5D3qXu23JGRoigpX5Ss4r9ZnDk3g0Z8uQC2x2lPaJ+UlWBc1ZWBWdLg==",
      "dev": true
    },
    "connected-domain": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/connected-domain/-/connected-domain-1.0.0.tgz",
      "integrity": "sha1-v+dyOMdL5FOnnwy2BY3utPI1jpM=",
      "dev": true
    },
    "console-browserify": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/console-browserify/-/console-browserify-1.2.0.tgz",
      "integrity": "sha512-ZMkYO/LkF17QvCPqM0gxw8yUzigAOZOSWSHg91FH6orS7vcEj5dVZTidN2fQ14yBSdg97RqhSNwLUXInd52OTA==",
      "dev": true
    },
    "constants-browserify": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/constants-browserify/-/constants-browserify-1.0.0.tgz",
      "integrity": "sha1-wguW2MYXdIqvHBYCF2DNJ/y4y3U=",
      "dev": true
    },
    "content-disposition": {
      "version": "0.5.3",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.3.tgz",
      "integrity": "sha512-ExO0774ikEObIAEV9kDo50o+79VCUdEB6n6lzKgGwupcVeRlhrj3qGAfwq8G6uBJjkqLrhT0qEYFcWng8z1z0g==",
      "dev": true,
      "requires": {
        "safe-buffer": "5.1.2"
      }
    },
    "content-type": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.4.tgz",
      "integrity": "sha512-hIP3EEPs8tB9AT1L+NUqtwOAps4mk2Zob89MWXMHjHWg9milF/j4osnnQLXBCBFBk/tvIG/tUc9mOUJiPBhPXA==",
      "dev": true
    },
    "convert-source-map": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-1.7.0.tgz",
      "integrity": "sha512-4FJkXzKXEDB1snCFZlLP4gpC3JILicCpGbzG9f9G7tGqGCzETQ2hWPrcinA9oU4wtf2biUaEH5065UnMeR33oA==",
      "dev": true,
      "requires": {
        "safe-buffer": "~5.1.1"
      }
    },
    "cookie": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.4.0.tgz",
      "integrity": "sha512-+Hp8fLp57wnUSt0tY0tHEXh4voZRDnoIrZPqlo3DPiI4y9lwg/jqx+1Om94/W6ZaPDOUbnjOt/99w66zk+l1Xg==",
      "dev": true
    },
    "cookie-signature": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
      "integrity": "sha1-4wOogrNCzD7oylE6eZmXNNqzriw=",
      "dev": true
    },
    "copy-concurrently": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/copy-concurrently/-/copy-concurrently-1.0.5.tgz",
      "integrity": "sha512-f2domd9fsVDFtaFcbaRZuYXwtdmnzqbADSwhSWYxYB/Q8zsdUUFMXVRwXGDMWmbEzAn1kdRrtI1T/KTFOL4X2A==",
      "dev": true,
      "requires": {
        "aproba": "^1.1.1",
        "fs-write-stream-atomic": "^1.0.8",
        "iferr": "^0.1.5",
        "mkdirp": "^0.5.1",
        "rimraf": "^2.5.4",
        "run-queue": "^1.0.0"
      }
    },
    "copy-descriptor": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/copy-descriptor/-/copy-descriptor-0.1.1.tgz",
      "integrity": "sha1-Z29us8OZl8LuGsOpJP1hJHSPV40=",
      "dev": true
    },
    "copy-props": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/copy-props/-/copy-props-2.0.4.tgz",
      "integrity": "sha512-7cjuUME+p+S3HZlbllgsn2CDwS+5eCCX16qBgNC4jgSTf49qR1VKy/Zhl400m0IQXl/bPGEVqncgUUMjrr4s8A==",
      "dev": true,
      "requires": {
        "each-props": "^1.3.0",
        "is-plain-object": "^2.0.1"
      }
    },
    "copy-webpack-plugin": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/copy-webpack-plugin/-/copy-webpack-plugin-5.1.1.tgz",
      "integrity": "sha512-P15M5ZC8dyCjQHWwd4Ia/dm0SgVvZJMYeykVIVYXbGyqO4dWB5oyPHp9i7wjwo5LhtlhKbiBCdS2NvM07Wlybg==",
      "dev": true,
      "requires": {
        "cacache": "^12.0.3",
        "find-cache-dir": "^2.1.0",
        "glob-parent": "^3.1.0",
        "globby": "^7.1.1",
        "is-glob": "^4.0.1",
        "loader-utils": "^1.2.3",
        "minimatch": "^3.0.4",
        "normalize-path": "^3.0.0",
        "p-limit": "^2.2.1",
        "schema-utils": "^1.0.0",
        "serialize-javascript": "^2.1.2",
        "webpack-log": "^2.0.0"
      },
      "dependencies": {
        "cacache": {
          "version": "12.0.4",
          "resolved": "https://registry.npmjs.org/cacache/-/cacache-12.0.4.tgz",
          "integrity": "sha512-a0tMB40oefvuInr4Cwb3GerbL9xTj1D5yg0T5xrjGCGyfvbxseIXX7BAO/u/hIXdafzOI5JC3wDwHyf24buOAQ==",
          "dev": true,
    "jasminewd2": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/jasminewd2/-/jasminewd2-2.2.0.tgz",
      "integrity": "sha1-43zwsX8ZnM4jvqcbIDk5Uka07E4=",
      "dev": true
    },
    "jest-worker": {
      "version": "25.1.0",
      "resolved": "https://registry.npmjs.org/jest-worker/-/jest-worker-25.1.0.tgz",
      "integrity": "sha512-ZHhHtlxOWSxCoNOKHGbiLzXnl42ga9CxDr27H36Qn+15pQZd3R/F24jrmjDelw9j/iHUIWMWs08/u2QN50HHOg==",
      "dev": true,
      "requires": {
        "merge-stream": "^2.0.0",
        "supports-color": "^7.0.0"
      },
      "dependencies": {
        "has-flag": {
          "version": "4.0.0",
          "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
          "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
          "dev": true
        },
        "supports-color": {
          "version": "7.1.0",
          "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.1.0.tgz",
          "integrity": "sha512-oRSIpR8pxT1Wr2FquTNnGet79b3BWljqOuoW/h4oBhxJ/HUbX5nX6JSruTkvXDCFMwDPvsaTTbvMLKZWSy0R5g==",
          "dev": true,
          "requires": {
            "has-flag": "^4.0.0"
          }
        }
      }
    },
    "js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true
    },
    "js-yaml": {
      "version": "3.13.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-3.13.1.tgz",
      "integrity": "sha512-YfbcO7jXDdyj0DGxYVSlSeQNHbD7XPWvrVWeVUujrQEoZzWJIRrCPoyk6kL6IAjAG2IolMK4T0hNUe0HOUs5Jw==",
      "dev": true,
      "requires": {
        "argparse": "^1.0.7",
        "esprima": "^4.0.0"
      }
    },
    "jsbn": {
      "version": "0.1.1",
      "resolved": "https://registry.npmjs.org/jsbn/-/jsbn-0.1.1.tgz",
      "integrity": "sha1-peZUwuWi3rXyAdls77yoDA7y9RM=",
      "dev": true
    },
    "jsesc": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-2.5.2.tgz",
      "integrity": "sha512-OYu7XEzjkCQ3C5Ps3QIZsQfNpqoJyZZA99wd9aWd05NCtC5pWOkShK2mkL6HXQR6/Cy2lbNdPlZBpuQHXE63gA==",
      "dev": true
    },
    "json-buffer": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.0.tgz",
      "integrity": "sha1-Wx85evx11ne96Lz8Dkfh+aPZqJg=",
      "dev": true
    },
    "json-parse-better-errors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json-parse-better-errors/-/json-parse-better-errors-1.0.2.tgz",
      "integrity": "sha512-mrqyZKfX5EhL7hvqcV6WG1yYjnjeuYDzDhhcAAUrq8Po85NBQBJP+ZDUT75qZQ98IkUoBqdkExkukOU7Ts2wrw==",
      "dev": true
    },
    "json-schema": {
      "version": "0.2.3",
      "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
      "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM=",
      "dev": true
    },
    "json-schema-ref-parser": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/json-schema-ref-parser/-/json-schema-ref-parser-9.0.1.tgz",
      "integrity": "sha512-KLrCjRjW5hMXxsX4osVBWpwixXL9NtICfpyNNS0eHguN5mP/I4UatI7i7PFS8jU94b1NHF4EbirACdCn0RFPBA==",
      "dev": true,
      "requires": {
        "@apidevtools/json-schema-ref-parser": "9.0.1"
      }
    },
    "json-schema-to-typescript": {
      "version": "9.1.0",
      "resolved": "https://registry.npmjs.org/json-schema-to-typescript/-/json-schema-to-typescript-9.1.0.tgz",
      "integrity": "sha512-9/yDXQQyqtRDxohQGRCKht4Wjfg73TALi1yzy651EOo71a6aKFtIm2WUbDWSf8OitFGukUn00dx4t1kg0W6O4Q==",
      "dev": true,
      "requires": {
        "@types/json-schema": "^7.0.4",
        "cli-color": "^2.0.0",
        "glob": "^7.1.6",
        "is-glob": "^4.0.1",
        "json-schema-ref-parser": "^9.0.1",
        "json-stringify-safe": "^5.0.1",
        "lodash": "^4.17.15",
        "minimist": "^1.2.5",
        "mkdirp": "^1.0.4",
        "mz": "^2.7.0",
        "prettier": "^2.0.5",
        "stdin": "0.0.1"
      },
      "dependencies": {
        "mkdirp": {
          "version": "1.0.4",
          "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
          "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw==",
          "dev": true
        }
      }
    },
    "json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="
    },
    "json-stable-stringify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/make-iterator/-/make-iterator-1.0.1.tgz",
      "integrity": "sha512-pxiuXh0iVEq7VM7KMIhs5gxsfxCux2URptUQaXo4iZZJxBAzTPOLE2BumO5dbfVYq/hBJFBR/a1mFDmOx5AGmw==",
      "dev": true,
      "requires": {
        "kind-of": "^6.0.2"
      }
    },
    "json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha1-nbe1lJatPzz+8wp1FC0tkwrXJlE=",
      "dev": true
    },
    "json-stringify-safe": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/json-stringify-safe/-/json-stringify-safe-5.0.1.tgz",
      "integrity": "sha1-Epai1Y/UXxmg9s4B1lcB4sc1tus=",
      "dev": true
    },
    "json3": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/json3/-/json3-3.3.3.tgz",
      "integrity": "sha512-c7/8mbUsKigAbLkD5B010BK4D9LZm7A1pNItkEwiUZRpIN66exu/e7YQWysGun+TRKaJp8MhemM+VkfWv42aCA==",
      "dev": true
    },
    "json5": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.1.3.tgz",
      "integrity": "sha512-KXPvOm8K9IJKFM0bmdn8QXh7udDh1g/giieX0NLCaMnb4hEiVFqnop2ImTXCc5e0/oHz3LTqmHGtExn5hfMkOA==",
      "dev": true,
      "requires": {
        "minimist": "^1.2.5"
      }
    },
    "jsonfile": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-4.0.0.tgz",
      "integrity": "sha1-h3Gq4HmbZAdrdmQPygWPnBDjPss=",
      "dev": true,
      "requires": {
        "graceful-fs": "^4.1.6"
      }
    },
    "jsonparse": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/jsonparse/-/jsonparse-1.3.1.tgz",
      "integrity": "sha1-P02uSpH6wxX3EGL4UhzCOfE2YoA=",
      "dev": true
    },
    "jsonpointer": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jsonpointer/-/jsonpointer-4.0.1.tgz",
      "integrity": "sha1-T9kss04OnbPInIYi7PUfm5eMbLk=",
      "dev": true
    },
    "jsprim": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/jsprim/-/jsprim-1.4.1.tgz",
      "integrity": "sha1-MT5mvB5cwG5Di8G3SZwuXFastqI=",
      "dev": true,
      "requires": {
        "assert-plus": "1.0.0",
        "extsprintf": "1.3.0",
        "json-schema": "0.2.3",
        "verror": "1.10.0"
      }
    },
    "jszip": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/jszip/-/jszip-3.3.0.tgz",
      "integrity": "sha512-EJ9k766htB1ZWnsV5ZMDkKLgA+201r/ouFF8R2OigVjVdcm2rurcBrrdXaeqBJbqnUVMko512PYmlncBKE1Huw==",
      "dev": true,
      "requires": {
        "lie": "~3.3.0",
        "pako": "~1.0.2",
        "readable-stream": "~2.3.6",
        "set-immediate-shim": "~1.0.1"
      }
    },
    "just-debounce": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/just-debounce/-/just-debounce-1.0.0.tgz",
      "integrity": "sha1-h/zPrv/AtozRnVX2cilD+SnqNeo=",
      "dev": true
    },
    "karma": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/karma/-/karma-5.0.1.tgz",
      "integrity": "sha512-xrDGtZ0mykEQjx1BUHOP1ITi39MDsCGocmSvLJWHxUQpxuKwxk3ZUrC6HI2VWh1plLC6+7cA3B19m12yzO/FRw==",
      "dev": true,
      "requires": {
        "body-parser": "^1.16.1",
        "braces": "^3.0.2",
        "chokidar": "^3.0.0",
        "colors": "^1.1.0",
        "connect": "^3.6.0",
        "di": "^0.0.1",
        "dom-serialize": "^2.2.0",
        "flatted": "^2.0.0",
        "glob": "^7.1.1",
        "graceful-fs": "^4.1.2",
        "http-proxy": "^1.13.0",
        "isbinaryfile": "^4.0.2",
        "lodash": "^4.17.14",
        "log4js": "^4.0.0",
        "mime": "^2.3.1",
        "minimatch": "^3.0.2",
        "qjobs": "^1.1.4",
        "range-parser": "^1.2.0",
        "rimraf": "^2.6.0",
        "socket.io": "2.1.1",
        "source-map": "^0.6.1",
        "tmp": "0.0.33",
        "ua-parser-js": "0.7.21",
        "yargs": "^15.3.1"
      },
      "dependencies": {
        "ansi-regex": {
          "version": "5.0.0",
          "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.0.tgz",
          "integrity": "sha512-bY6fj56OUQ0hU1KjFNDQuJFezqKdrAyFdIevADiqrWHwSlbmBNMHp5ak2f40Pm8JTFyM2mqxkG6ngkHO11f/lg==",
          "dev": true
        },
        "ansi-styles": {
          "version": "4.2.1",
          "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.2.1.tgz",
          "integrity": "sha512-9VGjrMsG1vePxcSweQsN20KY/c4zN0h9fLjqAbwbPfahM3t+NL+M9HC8xeXG2I8pX5NoamTGNuomEUFI7fcUjA==",
          "dev": true,
          "requires": {
            "@types/color-name": "^1.1.1",
            "color-convert": "^2.0.1"
          }
        },
        "anymatch": {
          "version": "3.1.1",
          "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.1.tgz",
          "integrity": "sha512-mM8522psRCqzV+6LhomX5wgp25YVibjh8Wj23I5RPkPppSVSjyKD2A2mBJmWGa+KN7f2D6LNh9jkBCeyLktzjg==",
          "dev": true,
          "requires": {
            "normalize-path": "^3.0.0",
            "picomatch": "^2.0.4"
          }
        },
        "binary-extensions": {
          "version": "2.0.0",
          "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.0.0.tgz",
          "integrity": "sha512-Phlt0plgpIIBOGTT/ehfFnbNlfsDEiqmzE2KRXoX1bLIlir4X/MR+zSyBEkL05ffWgnRSf/DXv+WrUAVr93/ow==",
          "dev": true
