<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox, ElDialog, ElButton } from 'element-plus'
import { artOutlineService, artPublishService } from '@/api/article.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { onMounted } from 'vue'
//import MarkdownIt from "markdown-it";
import TurndownService from 'turndown';
import { articleStore } from '@/stores'
import { useRouter } from 'vue-router'
const input1 = ref('')
const input2 = ref('')
const generatedText = ref('')
const dialogVisible = ref(false)
const textGenerated = ref(false)
// 定义响应式数据 articleTitle 和 articleContent
const articleTitle = ref('')
const articleContent = ref('')
const outline = ref('')
const router = useRouter();
const articlestore = articleStore()

const markdown = new MarkdownIt();

const showSidebar = ref(false);

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
    isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
    showSidebar.value = false; // 关闭侧边栏
    isSidebarOpen.value = false;
};
const isSidebarOpen = ref(false);



// 在你的Vue组件中定义一个方法来获取文章标题和文章内容，并调用接口请求
const generateOutline = async () => {

    //console.log('成功调用 generateOutline 方法');

    // 检查文章标题是否为空
    if (!articleTitle.value.trim()) {
        alert('文章标题不能为空');
        return; // 结束函数
    } else {
        //alert(articleTitle.value);
    }

    // 整合为 JSON 数据
    const data = {
        "title": articleTitle.value,
        "description": articleContent.value
    };

    // 调用接口请求

    const res = await artOutlineService(data)
    if (res.data.code === 200) {
        ElMessage.success('生成成功')
        const dagInput = document.getElementById('dag');
        dagInput.value = res.data.data;
        dagInput.dispatchEvent(new Event('input'));
    } else {
        console.log(res)
        ElMessage.error('生成失败: ' + res.data.message) // 显示错误信息
    }

};

const createArticle = async () => {
    //console.log('成功调用方法');
    // 检查文章大纲是否为空
    if (!outline.value.trim()) {
        alert('文章大纲不能为空');
        return; // 结束函数
    }

    const data = {
        "title": articleTitle.value,
        "outline": outline.value,
    }
    //测试
    // const input = 123;
    //     router.push({ name: 'edit', query: { input } });
    const res = await artPublishService(data)
    if (res.data.code === 200) {
        ElMessage.success('生成成功')
        articlestore.setarticle({
            id: null,
            title: articleTitle.value,
            content: res.data.data,
            createdTime: null
        })
        router.push({ name: 'edit' })
        // const articleContent = res.data.data;
        // router.push({ name: 'edit', query: { articleContent, articleTitle: articleTitle.value } });
    } else {
        console.log(res)
        ElMessage.error('生成失败: ' + res.data.message) // 显示错误信息
    }

}

const onSuccess = () => {
    // 处理成功回调
}
</script>

<template>
    <div class="overlay" v-if="isSidebarOpen" @click="closeSidebar"></div>
    <page-container title="文案分类">
        <span class="createArticle">
            文章生成
            <button @click="toggleSidebar">生成</button>
        </span>
        <div v-if="showSidebar" class="sidebar">
            <!-- 侧边栏内容 -->
            <el-button @click="closeSidebar" type="info" circle="true"><el-icon size="30">
                    <Close />
                </el-icon></el-button>
            <div>
                <p>
                    文章标题 <input v-model="articleTitle" placeholder="请输入标题"></input>
                </p>
            </div>
            <div>
                <p>
                    文案要求 <input v-model="articleContent" placeholder="请输入内容"></input>
                </p>
            </div>
            <div>
                <p>
                    <el-button @click="generateOutline" type="primary">生成大纲</el-button>
                </p>
            </div>
            <p>
                <textarea type="text" id="dag" v-model="outline" placeholder="待生成"></textarea>
            </p>
            <p>
                <el-button @click="createArticle" type="primary">
                    生成文案
                </el-button>
            </p>
        </div>

    </page-container>
</template>


<style lang="scss" scoped>
.sidebar {
    width: 700px;
    background-color: white;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 999;
}

div p {
    margin-top: 30px;
    text-align: center;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明黑色 */
    z-index: 999;
    /* 确保遮罩层在最上层 */
}

input {
    width: 80%;
    height: 30px;
}

#dag {
    height: 300px;
    width: 80%;
    font-size: 14px;
    overflow: auto;
}

.createArticle {
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
    padding-top: 30px;
    width: 200px;
    height: 150px;
    text-align: center;
    background-color: #cfe2ff;
    position: relative;
}

.createArticle button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 15px;
}

router-link {
    text-decoration: none;
    /* 去掉下划线 */
}
</style>