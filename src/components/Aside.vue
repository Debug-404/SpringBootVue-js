<template>
  <el-menu :default-active="Data.path" :router="true" router
           style="width: 200px; height:100%; min-height: calc(100vh - 40px)"
           unique-opened>
    <div style="display: flex;align-items: center;justify-content: center;padding: 11px 0;">
      <img alt="" src="../assets/img/logo.png" style="width: 60px;">
    </div>
    <el-menu-item index="/home">
      <el-icon>
        <House/>
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu v-if="judgeIdentity() === 2||judgeIdentity() ===3" index="2">
      <template #title>
        <el-icon>
          <User/>
        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item v-if="judgeIdentity() === 2||judgeIdentity() ===3" index="/stuInfo">学生信息</el-menu-item>
      <el-menu-item v-if="judgeIdentity() === 2||judgeIdentity() ===3" index="/workerInfo">维修员信息</el-menu-item>
      <el-menu-item v-if="judgeIdentity()===3" index="/dormManagerInfo">宿管信息</el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="judgeIdentity() === 2||judgeIdentity() ===3" index="3">
      <template #title>
        <el-icon>
          <Coin/>
        </el-icon>
        <span>宿舍管理</span>
      </template>
      <el-menu-item v-if="judgeIdentity() === 2||judgeIdentity() ===3" index="/buildingInfo">楼宇信息</el-menu-item>
      <el-menu-item v-if="judgeIdentity() === 2||judgeIdentity() ===3" index="/roomInfo">房间信息</el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="judgeIdentity() === 1||judgeIdentity() ===2||judgeIdentity() ===3" index="4">
      <template #title>
        <el-icon>
          <Message/>
        </el-icon>
        <span>信息管理</span>
      </template>
      <el-menu-item v-if="judgeIdentity() === 2||judgeIdentity() ===3" index="/noticeInfo">公告信息</el-menu-item>
      <el-menu-item v-if="judgeIdentity() !== 0" index="/repairInfo">报修信息</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-if="judgeIdentity() === 4" index="/visitorInfo">
      <svg class="icon" data-v-042ca774="" style="height: 18px; margin-right: 11px;" viewBox="0 0 1024 1024"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
            fill="currentColor"></path>
      </svg>
      <span>访客管理</span>
    </el-menu-item>
    <el-menu-item v-if="judgeIdentity() === 4" index="/myRoomInfo">
      <el-icon>
        <School/>
      </el-icon>
      <span>我的宿舍</span>
    </el-menu-item>
    <el-menu-item v-if="judgeIdentity() === 0" index="/applyRepairInfo">
      <el-icon>
        <SetUp/>
      </el-icon>
      <span>报修申请</span>
    </el-menu-item>
    <el-menu-item index="/selfInfo">
      <el-icon>
        <Setting/>
      </el-icon>
      <span>个人信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {onMounted, reactive} from "vue"

import {Coin, House, Message, School, Setting, SetUp, User} from "@element-plus/icons-vue"
import {ElMessage} from "element-plus";
import {useRoute, useRouter} from "vue-router"
import {useCounterStore} from "@/stores"
import request from "@/utils/index"

const router = useRouter()
const route = useRoute()
const Store = useCounterStore()


const Data = reactive({
  user: {},
  identity: '',
  path: route.path
})

onMounted(async () => {
  init()
})

const init = () => {
  request.get("/main/loadIdentity").then((res) => {
    if (res.data.code !== 200) {
      ElMessage({
        message: '用户会话过期',
        type: 'error',
      });
      sessionStorage.clear()
      request.get("/main/signOut");

    }
    window.sessionStorage.setItem("identity", JSON.stringify(res.data.data));
    Data.identity = res.data
  });
  request.get("/main/loadUserInfo").then((result) => {
    if (result.data.code !== 200) {
      ElMessage({
        message: '用户会话过期',
        type: 'error',
      });
      request.get("/main/signOut");
      sessionStorage.clear()
      router.replace({path: "/login"});
    }
    window.sessionStorage.setItem("user", JSON.stringify(result.data.data));
    Data.user = result.data
  });
}
const judgeIdentity = () => {
  if (Store.identity === 'stu') {
    return 0
  } else if (Store.identity === 'worker') {
    return 1
  } else if (Store.identity === "dormManager") {
    return 2
  } else return 3

}
</script>

<style scoped>
.icon {
  margin-right: 6px;
}

.el-sub-menu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 199px;
}
</style>
