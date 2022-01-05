const core = require('@actions/core');
const { getOctokit } = require('@actions/github');

async function main() {
  try {
    const token = core.getInput('github-token', { required: true });
    const personalAccount = core.getInput('personal-account');
    const repository = core.getInput('repository');
    const github = getOctokit(token);

    const accountType = personalAccount ? 'users' : 'orgs';
    const [owner, repo] = repository.split('/');
    const getUrl = `GET /${accountType}/${owner}/packages/container/${repo}/versions`;
    const { data: versions } = await github.request(getUrl);

    for (const version of versions) {
      const { metadata } = version;
      const { container } = metadata;
      const { tags } = container;

      if (!tags.length) {
        try {
          const { id } = version;
          const delUrl = `DELETE /${accountType}/${owner}/packages/container/${repo}/versions/${id}`;
          await github.request(delUrl);
          console.log(`successfully deleted container: ${repository} (${id})`);
        } catch (error) {
          console.log(`failed to delete container: ${repository} (${id})`);
          core.setFailed(error.message);
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
