<template>
    <el-table :data="dataShowTable" style="width: 100%">
        <el-table-column prop="mirna_id" label="miRNA"></el-table-column>
        <el-table-column prop="circrna_id" label="circRNA"></el-table-column>
        <el-table-column prop="disease" label="disease"></el-table-column>
        <el-table-column prop="score" label="score"></el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'PredictionTable',
    props: {
        dataShowTable: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.el-table {
    width: 100%;
}
</style>
