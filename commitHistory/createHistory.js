const { Configuration, OpenAIApi } = require("openai");
const {exec} = require("child_process");
const fs = require("fs");

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function askOpenAI(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.data.choices[0].text;
}

const prompt = `OpenAI file summary prompt for main.md:
You are an expert programmer, and you are trying to summarize a git diff.
Reminders about the git diff format:
For every file, there are a few metadata lines, like (for example):
'''
diff --git a/lib/index.js b/lib/index.js
index aadf691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
'''
This means that 'lib/index.js' was modified in this commit. Note that this is only an example.
Then there is a specifier of the lines that were modified.
A line starting with '+' means it was added.
A line that starting with '-' means that line was deleted.
A line that starts with neither '+' nor '-' is code given for context and better understanding. 
It is not part of the diff.

The following is a git diff of a single file.
Please summarize it in a comment, describing the changes made in the diff in high level.
Do it in the following way:
Write 'SUMMARY:' and then write a summary of the changes made in the diff, as a bullet point list.
Every bullet point should start with a '*'.


THE GIT DIFF OF main.md TO BE SUMMARIZED: \n`;

var commitMessage = "";
async function createHistory(id1, id2) {
    exec(`git diff ${id1} ${id2}`, {maxBuffer: 1024 * 5000}, async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}` +"1");
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}` +"2");
            return;
        }
        console.log(`stdout: ${stdout}` +"3");
        const response = 'await askOpenAI(prompt+stdout + "\nSUMMARY:")';


        fs.appendFile("commitMessage.txt", "Commit::" + id1 + " " + id2 + "\n" + response, function (err) {
            if (err) {
                return console.log(err +"4");
            }
            console.log("The file was saved!");
        }
        );
        fs.appendFile("commitMessage.txt", '\n', function (err) {
            if (err) {
                return console.log(err +"5");
            }
            console.log("The file was saved! 2");
        }
        );
    });
    
    
}


async function readCommitsId() {

    // read commithistory.txt and create a string of all the commits
    const commitHistory = fs.readFileSync("testcommithistory.txt", "utf8");
    // console.log(commitHistory);

    // split the string into an array of commits
    const commits = commitHistory.split("\n");
    console.log(commits);
    
    for (let i = 0; i < commits.length - 1; i++) {
        // console.log(commits[i]);
        // console.log(commits[i+1]);
        const message = await createHistory(commits[i], commits[i+1]);
        // console.log("message::",message);
        
    }
    

    
}







// createHistory();

readCommitsId();





