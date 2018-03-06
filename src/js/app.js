
/**
 * *<div class="tree">
    <span class="tree-switcher tree-switcher_close tree-node">Root</span>
    <ul class="tree-child-tree">
      <li>
        <span class="tree-switcher tree-switcher_close tree-node">Node1</span>
        <ul class="tree-child-tree">
          <li>
            <span class="tree-switcher tree-switcher_close tree-node">Node2</span>
            <ul class="tree-child-tree">
              <li>
                <span class="tree-switcher tree-switcher_close tree-node">Node3</span>
                <ul class="tree-child-tree">
                  <li>
                    <span class="tree-switcher tree-switcher_open tree-node">Node4</span>
                  </li>
                  <li>
                    <span class="tree-node tree-switcher tree-switcher_noop tree-node_active">8881</span>
                    <ul></ul>
                  </li>
                </ul>
              </li>
              <li>
                <span class="tree-switcher tree-switcher_noop tree-node">8882</span>
              </li>
            </ul>
          </li>
          <li>
            <span class="tree-switcher tree-switcher_noop tree-node">Node5</span>
          </li>
        </ul>
      </li>
      <li>
        <span class="tree-switcher tree-switcher_noop tree-node">8883</span>
      </li>
    </ul>
  </div>
}
*/
const wrapper = document.querySelector('#wrapper');

const deep = (tree, ul) => {
  const length = tree.length;
  if (length === 0) {
    return ul;
  }
  for (let i = 0; i < length; i++) {
    const child = tree[i];
    const text = child.data.text;
    const childUl = createElement(ul, text, 1);
    deep(child.children, childUl);
  }
};

const createElement = (fragment, text, flag) => {
  const span = document.createElement('span');
  span.className = 'tree-switcher tree-switcher_close tree-node';
  span.innerText = text;
  const ul = document.createElement('ul');
  ul.className = 'tree-child-tree';
  let box;
  if(flag){
    box = document.createElement('li')
  }else{
    box = document.createElement('div');
    box.className = 'tree';
  }
  box.appendChild(span);
  box.appendChild(ul);
  fragment.appendChild(box);
  return ul;
};

const render = (data, wrapper) => {
  const fragment = document.createDocumentFragment();

  createElement(fragment, data.root.data.text);
  deep(data.root.children, fragment.querySelector('ul'), 0);

  wrapper.appendChild(fragment);
};


const getJSON = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = () => {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
getJSON('src/json/basic.json', (err, data) => {
  if (err !== null) {
    console.log(`Something went wrong: ${err}`);
  } else {
    render(data, wrapper);
  }
});

