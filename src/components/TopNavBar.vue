<template>
    <el-header>
        <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="2">
                <div class="logo">CMIDB</div>
            </el-col>
            <el-col :span="21">
                <el-menu mode="horizontal" :default-active="curId">
                    <el-menu-item index="1">
                        <router-link to="/">index</router-link>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="/search">search </router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link to="/browser">browser</router-link>
                   </el-menu-item>
                    <el-menu-item index="4">
                        <router-link to="/about">about</router-link>
                    </el-menu-item>

                    <el-menu-item index="5">
                        <router-link to="/tool">tool</router-link>
                     </el-menu-item>
                   <el-menu-item index="6">
                        <router-link to="/download">download</router-link>
                   </el-menu-item>
                   <el-menu-item index="7">
                        <router-link to="/top">Top30</router-link>
                   </el-menu-item>
                </el-menu>
            </el-col>

        </el-row>
    </el-header>
</template>

<script>
export default {
    name: 'TopNavBar',
    props: {
        curId: {
            type: String,
            default: '1'
        }
    }
}
</script>

<style scoped>
.logo {
    font-size: 24px;
    font-weight: bold;
}
.align-right {
    text-align: right;
}

*{
    font-size: 16px;
}
</style>