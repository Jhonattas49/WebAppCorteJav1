const fs = require('fs');
const path = require('path');

function readGitignore(directory) {
    const gitignorePath = path.join(directory, '.gitignore');
    try {
        const data = fs.readFileSync(gitignorePath, 'utf8');
        return data.split(/\r?\n/).filter(line => !!line.trim() && !line.trim().startsWith('#')).map(pattern => {
            return pattern.replace(/^([\\/]+)/, '').replace(/([\\/]+)$/, '').replace(/^\./, '');
        });
    } catch (err) {
        return [];
    }
}

function readFiles(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    const gitignorePatterns = readGitignore(directory);

    return {
        gitignorePatterns,
        files
    };
}

function shouldIgnore(filePath, ignorePatterns) {
    const normalizedFilePath = filePath.replace(/\\/g, '/'); // Normalizar as barras para '/'
    return ignorePatterns.some(pattern => {
        const regex = new RegExp(`^${pattern.replace(/\*/g, '.*').replace(/\?/g, '.')}$`);
        return regex.test(normalizedFilePath);
    });
}

function listFiles(directory, depth = 0, ignorePatterns = []) {
    const { files, gitignorePatterns } = readFiles(directory);
    const allIgnorePatterns = [...ignorePatterns, ...gitignorePatterns];

    files.forEach(file => {
        const filePath = path.join(directory, file.name);

        if (shouldIgnore(filePath, allIgnorePatterns)) {
            return; // Ignorar arquivo ou diretório
        }

        const indentation = '|'.repeat(depth + 1);
        console.log(`${indentation} ${file.name}`);

        if (file.isDirectory()) {
            listFiles(filePath, depth + 1, allIgnorePatterns);
        }
    });
}

const rootDirectory = path.resolve(__dirname); // Diretório raiz do script
console.log('Relatório da estrutura:');
listFiles(rootDirectory);
