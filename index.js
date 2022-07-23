import fs from 'fs';
import path from 'path';
import { unified } from 'unified';
import markdown from 'remark-parse';

const __dirname = path.resolve();
const dirPath = path.join(__dirname, './contents');

// contents 폴더 목록 조회
const readDirs = () =>
  new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, dirs) => {
      if (err) {
        const message = 'Unable to scan directory';
        reject(message);
      }
      resolve(dirs);
    });
  });

// REAMME.md 파일 존재 여부 확인
const readChildDirMdFilePath = (dir) =>
  new Promise((resolve, reject) => {
    const currentPath = `${dirPath}/${dir}`;
    fs.readdir(currentPath, (err, files) => {
      if (err) {
        const message = `Fail to scan ${currentPath}`;
        reject(message);
      }

      const checkMdExist = files.find((file) => file === 'README.md');

      if (!checkMdExist) {
        const message = `Not Found ${currentPath}/README.md`;
        reject(message);
      }

      resolve(`${currentPath}/README.md`);
    });
  });

// README.md 파일에서 제목 추출
const extractTitleFromMDFile = (childDir, mdFilePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(mdFilePath, (err, buffer) => {
      if (err) {
        reject('Unable to read README.md');
      }

      let mdTitle = '';
      const mdText = buffer.toString();
      const mdAst = unified().use(markdown).parse(mdText);

      try {
        mdTitle = mdAst.children[0].children[0].value;
      } catch {
        mdTitle = childDir;
      }

      resolve(mdTitle);
    });
  });

// 페이지 링크 데이터 s생성
const createPageData = async (dirs) => {
  const pageDataRows = [];
  for (let dir of dirs) {
    const mdFilePath = await readChildDirMdFilePath(dir);
    const title = await extractTitleFromMDFile(dir, mdFilePath);
    const pageData = {
      href: `./contents/${dir}`,
      title: title ? `${dir}. ${title}` : dir,
    };
    pageDataRows.push(pageData);
  }
  return pageDataRows;
};

// JS 파일 생성
const createJSFile = (pageDataRows) => {
  const scriptFilePath = path.resolve(__dirname, 'static');
  fs.writeFile(
    `${scriptFilePath}/links.js`,
    `const pageData = ${JSON.stringify(pageDataRows)};`,
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
};

// JS 파일 생성 로직 실행
(async () => {
  const contentDirs = await readDirs();
  const pageData = await createPageData(contentDirs);
  createJSFile(pageData);
})();
