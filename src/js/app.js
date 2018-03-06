// 通用方法
const randomNum = max => Math.ceil(Math.random() * max);
const randomStr = () => Math.random().toString(36).substr(2);

// 获取节点模板的方法
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
// TODO: 优化算法
const randomData = (num, total) => {
  const nodes = [];
  if (num === 0 || total === 0) {
    return nodes;
  }
  for (let i = 0; i < num; i += 1) {
    const data = {
      data: {
        id: randomStr(),
        text: randomStr(),
      },
      children: [],
    };
    data.children = randomData(randomNum(5), total - 1);
    nodes.push(data);
  }
  return nodes;
};

// 设置树结构内容
const setTreeContent = () => {
  const tree = document.getElementById('tree');
  const data = {
    root: {
      data: {
        id: 'd9f0899f4fdf',
        text: '根节点',
      },
      children: randomData(randomNum(2), 3),
    },
  };
  tree.innerHTML = getNodeDom(data.root.data) + getChildDom(data.root.children);
};

setTreeContent();

// TODO: 优化random事件绑定方法
const randomBtn = document.getElementById('random');
randomBtn.addEventListener('click', () => {
  setTreeContent();
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

