// 通用
const getRandomNum = max => Math.ceil(Math.random() * max);
const getRandomStr = () => Math.random().toString(36).substr(2);

// 获取节点模板
const getNodeDom = node => `<span class="tree-switcher tree-switcher_close tree-node">${node.text}</span>`;
const getChildDom = (childData) => {
  if (childData.length === 0) {
    return '';
  }
  let str = '<ul class="tree-child-tree">';
  childData.map((node) => {
    str += '<li>';
    str += getNodeDom(node.data);
    if (node.children.length === 0) {
      str += '</li>';
    } else {
      str += getChildDom(node.children);
    }
    return null;
  });
  str += '</ul>';
  return str;
};

// 随机生成树结构数据
const getTreeData = () => {
  // length -> 兄弟节点个数
  // deep -> 树深度
  const randomTreeNodes = (length, deep) => {
    const nodes = [];
    for (let i = 0; i < length && deep > 0; i += 1) {
      const data = {
        data: {
          id: getRandomStr(),
          text: getRandomStr(),
        },
        children: [],
      };
      if (deep > 0) data.children = randomTreeNodes(getRandomNum(3), deep - 1);
      nodes.push(data);
    }
    return nodes;
  };
  return ({
    root: {
      data: {
        id: getRandomStr(),
        text: '根节点',
      },
      children: randomTreeNodes(getRandomNum(2), getRandomNum(10)),
    },
  });
};

window.addEventListener('load', () => {
  // 重绘DOM树
  const setTreeContent = (treeData) => {
    const treeDom = document.getElementById('tree');
    treeDom.innerHTML = getNodeDom(treeData.root.data) + getChildDom(treeData.root.children);
  };
  setTreeContent(getTreeData());
  // 绑定random data事件
  const randomBtnDom = document.getElementById('random');
  randomBtnDom.addEventListener('click', () => {
    setTreeContent(getTreeData());
  });
});

// 通过Json文件获取数据
// const getJSON = (url, callback) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.responseType = 'json';
//   xhr.onload = () => {
//     const status = xhr.status;
//     if (status === 200) {
//       callback(null, xhr.response);
//     } else {
//       callback(status, xhr.response);
//     }
//   };
//   xhr.send();
// };
// getJSON('src/json/basic.json', (err, data) => {
//   if (err !== null) {
//     console.log(`Something went wrong: ${err}`);
//   } else {
//     setTreeContent(data);
//   }
// });

