// 通用
const getRandomNum = max => Math.ceil(Math.random() * max);
const getRandomStr = () => Math.random().toString(36).substr(2);

// 获取节点模板
const getNodeDom = (node, nodeClasses) => `<span class="${nodeClasses}">${node.text}</span>`;
const getChildDom = (childData) => {
  if (childData.length === 0) {
    return '';
  }
  let str = '<ul class="tree__child__tree">';
  childData.map((node) => {
    const childLength = node.children.length;
    const nodeClasses = childLength === 0 ? 'tree__node' : 'tree__switcher tree__switcher--close tree__node';
    str += '<li class="tree__branch">';
    str += getNodeDom(node.data, nodeClasses);
    if (childLength === 0) {
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
      children: randomTreeNodes(getRandomNum(3), getRandomNum(10)),
    },
  });
};

window.addEventListener('load', () => {
  // 绑定节点toggle事件
  const bindNodeToggleEvent = () => {
    const treeSwitcher = document.querySelectorAll('.tree__switcher');
    treeSwitcher.forEach((switcher) => {
      switcher.addEventListener('click', () => {
        switcher.classList.toggle('tree__switcher--close');
        switcher.classList.toggle('tree__switcher--open');
        switcher.nextElementSibling.classList.toggle('hidden');
      });
    });
  };
  // 重绘DOM树
  const setTreeContent = (treeData) => {
    const treeDom = document.getElementById('tree');
    treeDom.innerHTML = getNodeDom(treeData.root.data, 'tree__switcher tree__switcher--close tree__node') + getChildDom(treeData.root.children);
    bindNodeToggleEvent();
  };
  // 绑定random data事件
  const bindRandomDataEvent = () => {
    const randomBtn = document.getElementById('random');
    randomBtn.addEventListener('click', () => {
      setTreeContent(getTreeData());
    });
  };
  // 绑定open all事件
  const bindOpenAllEvent = () => {
    const openAllBtn = document.getElementById('open');
    openAllBtn.addEventListener('click', () => {
      const treeSwitcher = document.querySelectorAll('.tree__switcher');
      treeSwitcher.forEach((switcher) => {
        switcher.classList.remove('tree__switcher--open');
        switcher.classList.add('tree__switcher--close');
        switcher.nextElementSibling.classList.remove('hidden');
      });
    });
  };
  // 绑定close all事件
  const bindCloseAllEvent = () => {
    const openAllBtn = document.getElementById('close');
    openAllBtn.addEventListener('click', () => {
      const treeSwitcher = document.querySelectorAll('.tree__switcher');
      treeSwitcher.forEach((switcher) => {
        switcher.classList.add('tree__switcher--open');
        switcher.classList.remove('tree__switcher--close');
        switcher.nextElementSibling.classList.add('hidden');
      });
    });
  };
  // 绑定change tree事件
  const bindChangeTreeEvent = () => {
    const options = document.querySelectorAll('#types .selector__option');
    const selectorBtn = document.querySelector('#types .selector__btn');
    const tree = document.getElementById('tree');
    options.forEach((option) => {
      if (!option.classList.contains('disabled')) {
        option.addEventListener('click', () => {
          selectorBtn.innerHTML = option.innerHTML;
          tree.className = option.getAttribute('value');
        });
      }
    });
  }
  setTreeContent(getTreeData());
  bindRandomDataEvent();
  bindOpenAllEvent();
  bindCloseAllEvent();
  bindChangeTreeEvent();
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

