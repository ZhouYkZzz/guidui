<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox, ElDialog, ElButton } from 'element-plus'
import { artGetReasonService, artCreateBreachService } from '@/api/article.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { articleStore } from '@/stores'
import { useRouter } from 'vue-router'

const input1 = ref('')
const input2 = ref('')
const generatedText = ref('')
const dialogVisible = ref(false)
const textGenerated = ref(false)
const articleTitle = ref('')
const articleContent = ref('')
const outline = ref('')
const router = useRouter();
const articlestore = articleStore()

const reasonsList = ref('')
const customer_name = ref('')
const remarks = ref('')
const attachment = ref(null) // 新增附件 ref

const showSidebar = ref(false);

onMounted(async () => {  
    try {  
        const response = await artGetReasonService();  
        if (response) {  
            console.log('成功获取违约原因列表:', response.data);
            reasonsList.value = response.data; // 确保 response.data 正确  
            populateReasons();  
        } else {  
            throw new Error('无效的响应格式');  
        }  
    } catch (error) {  
        console.error('API 调用失败:', error);  
                if (error.response) {  
                    console.error('响应数据:', error.response.data);  
                    console.error('响应状态:', error.response.status);  
                    console.error('响应头:', error.response.headers);  
                } else if (error.request) {  
                    console.error('请求数据:', error.request);  
                } else {  
                    console.error('错误信息:', error.message);  
                }  
                const errorMessage = error?.message || '未知错误';  
                ElMessage.error('获取数据失败: ' + errorMessage);  
        }
});

const CommitApplication = async () => {
    try {
        // 获取表单数据
        const customerName = customer_name.value;
        const externalRating = document.getElementById('level').value;
        const selectedReasonId = document.getElementById('reasons').value;
        const severity = document.getElementById('severity').value;
        const remarksText = remarks.value;
        const attachmentFile = attachment.value; // 获取附件

        // 找到对应的原因文本
        const selectedReason = reasonsList.value.find(reason => reason.ID === parseInt(selectedReasonId, 10));
        const reasonText = selectedReason ? selectedReason.Reason : '';

        // 构建请求数据
        const data = {
            customer_name: customerName,
            external_rating: externalRating, 
            default_reason: reasonText, // 使用原因文本
            severity: severity, 
            remarks: remarksText,
            attachments: [attachmentFile], // 包含附件
        };

        // 调用 API 服务
        const response = await artCreateBreachService(data);
        console.log('申请提交成功:', response);

        // 成功信息提示
        ElMessage.success('申请提交成功！');

        // 清空输入框
        customer_name.value = '';
        document.getElementById('level').value = '';
        document.getElementById('reasons').value = '';
        document.getElementById('severity').value = '';
        remarks.value = '';
        attachment.value = null; // 清空附件
    } catch (error) {
        console.error('申请提交失败:', error);
        const errorMessage = error?.message || '未知错误';
        ElMessage.error('提交申请失败: ' + errorMessage);
    }
};

const populateReasons = async () => {  
    const selectElement = document.getElementById('reasons');  
    
    // 清空已有的选项，保留第一项  
    while (selectElement.options.length > 1) {  
        selectElement.remove(1);  
    }  

    // 添加新的选项  
    reasonsList.value.forEach(reason => {  
        const option = document.createElement('option');  
        option.value = reason.ID;  // 使用 reason.ID 作为选项的值
        option.textContent = reason.Reason;   // 显示的文本  
        selectElement.appendChild(option);  
    });  
}  

const displaySelected = () => {  
    const selectElement = document.getElementById('reasons');  
    const selectedValue = selectElement.value;  
    console.log('Selected reason ID:', selectedValue);  
}

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value;
    isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
    showSidebar.value = false; // 关闭侧边栏
    isSidebarOpen.value = false;
};

const isSidebarOpen = ref(false);

const onSuccess = () => {
    // 处理成功回调
}

// 处理附件上传
const handleAttachmentChange = (event) => {
    attachment.value = event.target.files[0];
};
</script>

<template>
    <div class="overlay" v-if="isSidebarOpen" @click="closeSidebar"></div>
    <page-container title="违约认定申请">
        <div>
            客户名称 <input v-model="customer_name" placeholder="请输入客户名称"></input>
        </div>
        <div>
            <label for="level">最新外部等级:</label>  
            <select id="level" onchange="">  
                <option value="">请选择</option>  
                <option value="1">A</option>  
                <option value="2">B</option>  
                <option value="3">C</option>  
            </select>  
        </div>
        <div>
            <label for="reasons">违约原因:</label>  
            <select id="reasons" @change="displaySelected()"> 
                <option value="">请选择</option>
            </select>  
        </div>
        <div>
            <label for="severity">违约严重性:</label>  
            <select id="severity" onchange="">  
                <option value="0">请选择</option>  
                <option value="1">高</option>  
                <option value="2">中</option>  
                <option value="3">低</option>  
            </select>  
        </div>
        <div>
            备注信息 <input v-model="remarks" placeholder="请输入备注信息"></input>
        </div>
        <div>
            <label for="attachment">附件:</label>
            <input type="file" id="attachment" @change="handleAttachmentChange" />
        </div>
        <el-button @click="CommitApplication" type="primary">
            提交申请
        </el-button>
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

div {
    margin-top: 15px;
}

select {  
    padding: 8px;  
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
