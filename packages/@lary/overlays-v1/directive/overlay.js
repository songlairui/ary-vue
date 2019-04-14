const wait = (time = 1) => new Promise(r => setTimeout(r, time));

function calcOverAll(root) {
  const styleToSet = {
    "z-index": 100
  };
  const { offsetHeight: rootHeight, offsetWidth: rootWidth } = root;
  const { x: rootX, y: rootY } = root.getBoundingClientRect();
  const top = rootY;
  if (rootX) {
    styleToSet.left = `${rootX}px`;
    styleToSet.width = `${rootWidth}px`;
  }

  styleToSet.top = `${top}px`;
  styleToSet.height = `${rootHeight - top}px`;
  return styleToSet;
}
function calcOverToBottom(root, target) {
  const styleToSet = {
    "z-index": "unset"
  };
  const { offsetHeight: rootHeight, offsetWidth: rootWidth } = root;
  const { x: rootX, y: rootY } = root.getBoundingClientRect();
  const top = rootY + target.offsetHeight + target.offsetTop;
  if (rootX) {
    styleToSet.left = `${rootX}px`;
    styleToSet.width = `${rootWidth}px`;
  }

  styleToSet.top = `${top}px`;
  styleToSet.height = `${rootHeight - top}px`;
  return styleToSet;
}

export default async function(
  el,
  { name, value = "", oldValue, expression, arg, modifiers },
  vNode,
  oldVNode
) {
  let { target } = value;
  if (!target) {
    await wait();
    target = el.parentNode;
  }
  if (!target) return;
  let root = target;
  while (root.offsetParent) {
    if (root.classList.contains("x-page-content")) {
      break;
    }
    root = root.offsetParent;
  }
  let styleToSet;
  switch (value) {
    case "overall":
      styleToSet = calcOverAll(root);
      break;
    case "overtoBottom":
    default:
      styleToSet = calcOverToBottom(root, target);
  }
  Object.assign(el.style, styleToSet);
}
