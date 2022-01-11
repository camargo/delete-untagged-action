# Delete Untagged Action

Deletes all untagged image versions from the [GitHub Packages][github-packages] container registry.

## Usage

```yaml
uses: camargo/delete-untagged-action@v1
with:
  github-token: ${{ secrets.DELETE_PACKAGES_TOKEN }}
```

Note the `DELETE_PACKAGES_TOKEN` was created by following the [Granting Additional Permissions][github-granting-additional-permissions] documentation since you need to use a token that has the `delete:packages` permission.

## Inputs

## `github-token`

**Required** A GitHub token with the `delete:packages` permission. The [GITHUB_TOKEN][github-token-permissions] does not have this permission.

## `package-name`

Override the package name that contains the untagged versions you want to delete. Defaults to the [github.repository][github-context] context variable `repository name` portion.

## `personal-account`

Set to `true` if you are running this action against [personal account](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#personal-accounts) packages. Defaults to [organization account](https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts#organization-accounts) packages.

## `repository`

The owner and repository name. For example, `Codertocat/Hello-World`. Defaults to the [github.repository][github-context] context variable.

## References

The following references were used for building this action:

1. [GitHub REST API - Delete a package for an organization](https://docs.github.com/en/rest/reference/packages#delete-a-package-for-an-organization)
1. [GitHub REST API - Delete a package for a user](https://docs.github.com/en/rest/reference/packages#delete-a-package-for-a-user)
1. [Permissions for the GITHUB_TOKEN][github-token-permissions]
1. [Granting additional permissions][github-granting-additional-permissions]

[github-context]: https://docs.github.com/en/actions/learn-github-actions/contexts#github-context
[github-granting-additional-permissions]: https://docs.github.com/en/actions/security-guides/automatic-token-authentication#granting-additional-permissions
[github-packages]: https://github.com/features/packages
[github-token-permissions]: https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
