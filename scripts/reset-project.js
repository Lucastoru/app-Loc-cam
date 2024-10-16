const fs = require('fs'); // Importa o módulo de sistema de arquivos do Node.js
const path = require('path'); // Importa o módulo de caminho de arquivos do Node.js

const root = process.cwd(); // Obtém o diretório de trabalho atual
const oldDirPath = path.join(root, 'app'); // Define o caminho para o diretório 'app'
const newDirPath = path.join(root, 'app-example'); // Define o caminho para renomear 'app' para 'app-example'
const newAppDirPath = path.join(root, 'app'); // Define o novo caminho para recriar o diretório 'app'

const indexContent = `import { Text, View } from "react-native";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}`; // Define o conteúdo do arquivo index.tsx

const layoutContent = `import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}`; // Define o conteúdo do arquivo _layout.tsx

// Renomeia o diretório 'app' para 'app-example'
fs.rename(oldDirPath, newDirPath, (error) => {
  if (error) {
    return console.error(`Error renaming directory: ${error}`);
  }
  console.log('/app moved to /app-example.');

  // Cria o novo diretório 'app'
  fs.mkdir(newAppDirPath, { recursive: true }, (error) => {
    if (error) {
      return console.error(`Error creating new app directory: ${error}`);
    }
    console.log('New /app directory created.');

    const indexPath = path.join(newAppDirPath, 'index.tsx'); // Define o caminho para o arquivo index.tsx

    // Escreve o conteúdo do index.tsx no novo diretório 'app'
    fs.writeFile(indexPath, indexContent, (error) => {
      if (error) {
        return console.error(`Error creating index.tsx: ${error}`);
      }
      console.log('app/index.tsx created.');

      const layoutPath = path.join(newAppDirPath, '_layout.tsx'); // Define o caminho para o arquivo _layout.tsx

      // Escreve o conteúdo do _layout.tsx no novo diretório 'app'
      fs.writeFile(layoutPath, layoutContent, (error) => {
        if (error) {
          return console.error(`Error creating _layout.tsx: ${error}`);
        }
        console.log('app/_layout.tsx created.');
      });
    });
  });
});
