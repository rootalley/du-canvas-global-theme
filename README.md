# du-canvas-global-theme

Global JavaScript and CSS files for Canvas at Dominican University.

These are configured in the Canvas admin settings. See [Adding custom javascript and CSS](https://guides.instructure.com/m/4214/l/41896-how-do-i-add-custom-javascript-and-css-files-to-my-account) for more information.

## Contributing

Contributors should use the typical git pull request workflow that is [outlined nicely by Chaser324](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

### Initial One-Time Setup for Contributors

1.  Fork the [du-canvas-global-theme](https://github.com/rootalley/du-canvas-global-theme) repository into your own GitHub account.
2.  Clone your forked repository to your local machine: `git clone https://github.com/<your_username>/du-canvas-global-theme.git`
3.  Now you can see all the code in the `du-canvas-global-theme` directory on your machine.
4.  Add the upstream remote so you can keep your code in sync with this repository: `git remote add upstream https://github.com/rootalley/du-canvas-global-theme`.

### Ongoing changes

1.  Always start by getting your local code and your forked code on GitHub to date with this repository:

    ```Shell
    git checkout master;
    git pull upstream master;
    git push origin master;
    ```

2.  Now create a branch to work on your changes: `git checkout -b <branch_name>`.
3.  Make your changes, add your files to the local index, and commit them:

    ```Shell
    git add <your_files>
    git commit -m "A nice message describing the change"
    ```
4.  Push your changes to your fork on GitHub: `git push origin <branch_name>`.
5.  Login to GitHub and open a pull request against `rootalley/master`. Be sure to give the pull request a nice title and description.
6.  Once your pull request has been merged, you can delete your branch:

    ```Shell
    git checkout master;
    git pull upstream master;
    git branch -d <branch_name>;
    git push origin master;
    ```
