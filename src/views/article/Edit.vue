<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, ElDialog } from 'element-plus'
import { useRoute } from 'vue-router'
import { artSave } from '@/api/article.js'
import E from "wangeditor";
//import MarkdownIt from "markdown-it";
import TurndownService from 'turndown';
import { articleStore } from '@/stores'
const onSuccess = () => {[plugin:vite:import-analysis] Failed to resolve import "markdown-it" from "src\views\article\ArticleChannel.vue". Does the file exist?
  // 处理成功回调
}
const markdown = new MarkdownIt();
const turndownService = new TurndownService();
const articlestore = articleStore()
const data = {
  title: articlestore.title,
  content: articlestore.content,
  createdTime: articlestore.createdTime,
  id: articlestore.id
}
let editor; // 声明一个变量来保存编辑器实例
onMounted(() => {
  const input = document.getElementById('title')
  if (input) {
    input.value = data.title
  }
  
//富文本编辑器
  editor = new E('#editor');
  editor.create();
  editor.txt.html(markdown.render(data.content))
})

const saveArticle = async () => {
  console.log('成功调用方法')
  var title = document.getElementById('title')
  // 检查文章是否为空
  if (!title.value.trim()) {
    alert('文章标题不能为空')
    return // 结束函数
  }
  data.content = turndownService.turndown(editor.txt.html())
  const res = await artSave(data)
  if (res.data.code === 200) {
    ElMessage.success('保存成功')
  } else {
    console.log(res)
    ElMessage.error('保存失败: ' + res.data.message) // 显示错误信息
  }
}
</script>


<template>
  <page-container title="文案编辑">
    <div class="titleEdit">
      <p>
        标题
        <input id="title" type="text" v-model="data.title" />
      </p>
    </div>
    <div id="editor" >
    </div>
    
    <div style="justify-content: center; display: flex">
      <button class="saveArticle" @click="saveArticle">保存</button>
    </div>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
<style lang="scss" scoped>

div p {
  margin-top: 0;
}
.titleEdit {
  display: flex;
}
.edit {
  height: 460px;
  width: 100%;
  overflow: auto;
}
button {
  bottom: 0;
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
  margin-top: 15px;
}
</style>
