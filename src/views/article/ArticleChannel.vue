<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox, ElDialog, ElButton } from 'element-plus'
<<<<<<< HEAD
import { artOutlineService, artPublishService,registerService } from '@/api/article.js'
=======
//import { artOutlineService, artPublishService } from '@/api/article.js'
>>>>>>> 2d577ff996c46e50e401a54db8088c609340e5a2
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { onMounted } from 'vue'
//import MarkdownIt from "markdown-it";
//import TurndownService from 'turndown';
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

//#region 生成文章
// 在你的Vue组件中定义一个方法来获取文章标题和文章内容，并调用接口请求
// const generateOutline = async () => {

//     //console.log('成功调用 generateOutline 方法');

//     // 检查文章标题是否为空
//     if (!articleTitle.value.trim()) {
//         alert('文章标题不能为空');
//         return; // 结束函数
//     } else {
//         //alert(articleTitle.value);
//     }

//     // 整合为 JSON 数据
//     const data = {
//         "title": articleTitle.value,
//         "description": articleContent.value
//     };

//     // 调用接口请求

//     const res = await artOutlineService(data)
//     if (res.data.code === 200) {
//         ElMessage.success('生成成功')
//         const dagInput = document.getElementById('dag');
//         dagInput.value = res.data.data;
//         dagInput.dispatchEvent(new Event('input'));
//     } else {
//         console.log(res)
//         ElMessage.error('生成失败: ' + res.data.message) // 显示错误信息
//     }

// };

// const createArticle = async () => {
//     //console.log('成功调用方法');
//     // 检查文章大纲是否为空
//     if (!outline.value.trim()) {
//         alert('文章大纲不能为空');
//         return; // 结束函数
//     }

//     const data = {
//         "title": articleTitle.value,
//         "outline": outline.value,
//     }
//     //测试
//     // const input = 123;
//     //     router.push({ name: 'edit', query: { input } });
//     const res = await artPublishService(data)
//     if (res.data.code === 200) {
//         ElMessage.success('生成成功')
//         articlestore.setarticle({
//             id: null,
//             title: articleTitle.value,
//             content: res.data.data,
//             createdTime: null
//         })
//         router.push({ name: 'edit' })
//         // const articleContent = res.data.data;
//         // router.push({ name: 'edit', query: { articleContent, articleTitle: articleTitle.value } });
//     } else {
//         console.log(res)
//         ElMessage.error('生成失败: ' + res.data.message) // 显示错误信息
//     }

// }
//#endregion 生成文章

const Register = async () => {

    // 整合为 JSON 数据
    const data = {
        "username": "许强",
        "password": "ullamco eu",
        "is_reviewer": false
    };

    // 调用接口请求

    const res = await registerService(data)
    if (res.data.code === 200) {
        ElMessage.success('成功')
        console.log(res)
    } else {
        console.log(res)
        ElMessage.error('失败: ' + res.data.message) // 显示错误信息
    }

};

const onSuccess = () => {
    // 处理成功回调
}
</script>

<template>
    <div class="overlay" v-if="isSidebarOpen" @click="closeSidebar"></div>
    <page-container title="违约认定申请">

        <div>
            客户名称 <input v-model="customer_name" placeholder="请输入客户名称"></input>
        </div>
        <div>
            <label for="options">最新外部等级:</label>  
            <select id="options" onchange="displaySelected()">  
                <option value="">请选择</option>  
                <option value="option1">A</option>  
                <option value="option2">B</option>  
                <option value="option3">C</option>  
            </select>  
        </div>
        <div>
            <label for="options">违约原因:</label>  
            <select id="options" onchange="displaySelected()">  
                <option value="">请选择</option>  
                <option value="option1">未按时还款</option>  
                <option value="option2">资金链断裂</option>  
                <option value="option3">其他</option>  
            </select>  
        </div>
        <div>
            <label for="options">违约严重性:</label>  
            <select id="options" onchange="displaySelected()">  
                <option value="">请选择</option>  
                <option value="option1">高</option>  
                <option value="option2">中</option>  
                <option value="option3">低</option>  
            </select>  
        </div>
        <div>
            备注信息 <input v-model="remarks" placeholder="请输入备注信息"></input>
        </div>
        <el-button @click="Register" type="primary">
                    提交申请
        </el-button>
        <!-- <span class="createArticle">
            生成文案
            <button @click="toggleSidebar">生成</button>
        </span>
        // 侧边栏
        <div v-if="showSidebar" class="sidebar">
            
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
        </div> -->

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

div{
    margin-top: 15px;
}

select {  
    padding: 10px;  
    border: 1px solid #ccc;  
    border-radius: 4px;  
    margin-top: 10px;  
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

button {
    margin-top: 15px;
    position: absolute;
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