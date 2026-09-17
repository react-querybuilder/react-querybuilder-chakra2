# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v8.24.1] - 2025-09-17

### Added

- `ChakraShiftActions` is now exported and included in `chakraControlElements`.
- "Mute"/"unmute" icons for `react-querybuilder`'s mute feature.
- `testID` prop is now applied as `data-testid` on all components.

### Fixed

- `ChakraValueSelector` uses `useValueSelector`/`useSelectElementChangeHandler`, so multi-value ("between"/"in") selections work correctly. It also properly disables the `Select` (`isDisabled` instead of `disabled`).
- Production builds now define `process.env.NODE_ENV` correctly.

## [v8.24.0] - 2025-09-16

### Added

- "Ungroup" icon for `react-querybuilder`'s new ungroup feature.

## [v8.15.0] - 2025-01-09

- Synchronized version with `react-querybuilder`.

## [v8.1.0] - 2025-01-09

- Synchronized version with `react-querybuilder`.

## [v8.0.0] - 2024-11-08

- Synchronized version with `react-querybuilder`.

## [v7.7.1] - 2024-11-07

### Added

- Initial publish. For changes prior to this release, see the [`react-querybuilder` changelog](https://github.com/react-querybuilder/react-querybuilder/blob/main/CHANGELOG.md#v771---2024-10-21).

<!-- #region Release comparison links -->

[unreleased]: https://github.com/react-querybuilder/react-querybuilder-chakra2/compare/v8.24.1...HEAD
[v8.24.1]: https://github.com/react-querybuilder/react-querybuilder-chakra2/compare/v8.24.0...v8.24.1
[v8.24.0]: https://github.com/react-querybuilder/react-querybuilder-chakra2/compare/v8.15.0...v8.24.0
[v8.15.0]: https://github.com/react-querybuilder/react-querybuilder-chakra2/compare/v8.1.0...v8.15.0
[v8.1.0]: https://github.com/react-querybuilder/react-querybuilder-chakra2/compare/v8.0.0...v8.1.0
[v8.0.0]: https://github.com/react-querybuilder/react-querybuilder-chakra2/compare/v7.7.1...v8.0.0
[v7.7.1]: https://github.com/react-querybuilder/react-querybuilder-chakra2/releases/tag/v7.7.1

<!-- #endregion -->
