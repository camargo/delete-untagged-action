const core = require('@actions/core');
const { getOctokit } = require('@actions/github');

async function main() {
  try {
    const token = core.getInput('github-token', { required: true });
    const repository = core.getInput('repository', { required: true });
    const github = getOctokit(token, opts);

    const [org, repo] = repository.split('/');
    const getUrl = `GET /orgs/${org}/packages/container/${repo}/versions`;
    const { data: versions } = await github.request(getUrl);

    for (const version of versions) {
      if (!version.metadata.container.tags.length) {
        const { id } = version;
        console.log(`deleting version with id: ${id}`);
        const delUrl = `DELETE /orgs/${org}/packages/container/${repo}/versions/${id}`;
        const { status } = await github.request(delUrl);
        console.log(`deleted status: ${status}`);
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
