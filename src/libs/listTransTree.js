/*
 * 本系统主要有两个tree，机构人员和档案材料目录，需要将单级list转成多级list tree
 */
'use strict'
// const _ = require('lodash')

/**
 * List transform to Array tree.
 * @param  {Array} list
 * @return {Array} tree
 */
export function listToArrayTree(list, parentId = 0, idName = 'id', parentIdName = 'parentId', level = 99, depth) {
  if (!list.length) return []

  const itemArr = []
  for (let i = 0; i < list.length; i++) {
    const node = Object.assign({}, list[i])
    if (node[parentIdName] == parentId) {
      let cDepth = depth || 0 // 第一级重置为0
      cDepth++
      // console.log('depth: ' + depth)
      // console.log('level: ' + level)
      if (cDepth < level && !node.children) {
        node.children = listToArrayTree(list, node[idName], idName, parentIdName, level, cDepth)
      }
      itemArr.push(node)
    }
  }
  if (itemArr.length) {
    return itemArr
  }
}

/**
 * List transform to a completely different form before.
 * @param  {Array} list
 * @return {Array} list
 */
export function listToDisorder(list = [], depth = 1) {
  const cloneList = list.slice(0)
  let temp = []
  const getRandomNum = (min, max) => {
    return parseInt(Math.random() * (max - min))
  }
  // console.log('depth: '+depth)
  cloneList.forEach((item, i) => {
    let num = 0
    const combNum = () => {
      num = getRandomNum(0, cloneList.length)

      if (cloneList[num] === cloneList[i]) { // completely different
        combNum()
      }
    }
    combNum()
    temp = temp.concat(cloneList.splice(num, num + 1))
  })
  depth--
  if (depth > 0) {
    listToDisorder(temp, depth)
  }
  return temp
}
/**
 *
 *
 * @param {*} item
 * @param {*} key
 * @param {*} node
 * @returns
 */
export function reduceCalculate(item, key, node) {
  let count = item[key]
  if (item[node]) {
    item[node] = reduceTreeMap(item[node], key, node)
    item[node].forEach(v => {
      count += v[key]
    })
  }
  return count
}
/**
 *
 *
 * @param {*} tree
 * @param {string} [key='staffAdminCount']
 * @param {string} [node='children']
 * @returns
 */
export function reduceTreeMap(tree, key = 'staffAdminCount', node = 'children') {
  return tree.map(item => {
    item[key] = reduceCalculate(item, key, node)
    return item
  })
}
