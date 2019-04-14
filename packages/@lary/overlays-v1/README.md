# overlay 组件

现有情况：

1. Pane 中将 v-show 换成 v-if , 会发生切换显示弹层时，mask 抖动。

理想情况下，需将 mask 向外提，overlay 组件使用同一个 mask，现在是每个 panel 使用各自的 mask
可通过在函数式组件中，将子组件的 slot，拆分完之后，统一分到上一层 overlay 中，统一管理 mask

后续优化
