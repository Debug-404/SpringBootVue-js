<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight" style="margin: 16px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin: 15px; min-height: calc(100vh - 111px)">
      <div style="display: flex">
        <div style="width: 600px; margin-left: 30px; position: relative">
          <el-descriptions :column="1" border size="large" style="min-width: 500px" title="">
            <el-descriptions-item>
              <template #label>
                <div>
                  <el-icon>
                    <User/>
                  </el-icon>
                  用户名
                </div>
              </template>
              {{ id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>
                  <el-icon>
                    <location/>
                  </el-icon>
                  姓名
                </div>
              </template>
              {{ name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>
                  <el-icon>
                    <component :is="sex === '男' ? 'Female' : 'Male'"/>
                  </el-icon>
                  性别
                </div>
              </template>
              {{ sex }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>
                  <el-icon>
                    <office-building/>
                  </el-icon>
                  年龄
                </div>
              </template>
              {{ age }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div>
                  <el-icon>
                    <iphone/>
                  </el-icon>
                  手机号
                </div>
              </template>
              {{ phone }}
            </el-descriptions-item>
          </el-descriptions>
          <el-tooltip content="修改信息" placement="bottom">
            <el-button icon="Edit" size="large" style="margin-top: 30px; width: 80px" type="primary"
                       @click="Edit">
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <div>
        <!--      弹窗-->
        <el-dialog v-model="dialogVisible" title="操作" width="30%" @close="cancel">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="账号" prop="username">
              <el-input v-model="form.id" disabled style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" :disabled="disabled" :show-password="showpassword"
                        show-password
                        style="width: 80%"></el-input>
              <el-tooltip content="修改密码" placement="right">
                <el-icon size="large" style="margin-left: 5px; cursor: pointer" @click="EditPass">
                  <edit/>
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item :style="display" label="确认密码" prop="checkPass">
              <el-input v-model="form.checkPass" show-password style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio v-model="form.sex" label="男">男</el-radio>
              <el-radio v-model="form.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="form.age" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model.number="form.phone" style="width: 80%"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script src="@/assets/js/SelfInfo.js"></script>
<style scoped>@import '../assets/css/SelfInfo.css';

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
      135deg,
      hsl(170deg, 80%, 70%),
      hsl(190deg, 80%, 70%),
      hsl(250deg, 80%, 70%),
      hsl(320deg, 80%, 70%),
      hsl(320deg, 80%, 70%),
      hsl(250deg, 80%, 70%),
      hsl(190deg, 80%, 70%),
      hsl(190deg, 80%, 70%),
      hsl(170deg, 80%, 70%)
  );
  background-size: 600%;
  animation: myanimation 15s linear infinite;
}

@keyframes myanimation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}</style>
