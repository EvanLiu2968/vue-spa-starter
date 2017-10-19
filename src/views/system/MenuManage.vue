<template>
    <div class="">
        <el-tree
          :data="data2"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
        <el-dialog title="修改菜单项" v-model="editMenuFormVisible">
            <div class="form-box">
                <el-form :model="editMenuForm" ref="editMenuForm"  label-width="120px">
                    <el-form-item label="菜单名称" prop="label">
                        <el-input v-model="editMenuForm.label"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="editMenuFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editMenuFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        editMenuFormVisible:false,
        editMenuForm:{
            label:''
        }
      }
    },

    methods: {
      append(store, data) {
        store.append({ id: id++, label: '新增菜单', children: [] }, data);
      },
      remove(store, data) {
        store.remove(data);
      },
      edit(store, data) {
        this.editMenuForm.label=data.label;
        this.editMenuFormVisible=true;
      },
      renderContent(h, { node, data, store }) {
        return (
          <div style="padding:4px 0">
            <span style="margin-right:20px;">{node.label}</span>
            <el-button-group>
              <el-button type="primary" size="mini" on-click={ () => this.append(store, data) }>添加菜单项</el-button>
              <el-button type="primary" size="mini" on-click={ () => this.edit(store, data) }>修改菜单项</el-button>
              <el-button type="primary" size="mini" on-click={ () => this.edit(store, data) }>权限分配</el-button>
              <el-button type="danger" size="mini" on-click={ () => this.remove(store, data) }>删除菜单项</el-button>
            </el-button-group>
          </div>);
      }
    }
  };
</script>
<style>
.el-tree-node__content{
  height:36px;
}
</style>