<template>
    <el-table :data="dataShowTable" style="width: 100%">
        <el-table-column prop="mirna_id" label="miRNA"></el-table-column>
        <el-table-column prop="circrna_id" label="circRNA"></el-table-column>
        <el-table-column prop="disease" label="disease"></el-table-column>
        <!-- <el-table-column prop="description" label="description"></el-table-column> -->
        <el-table-column prop="pmid" label="pmid">
            <template #default="scope">
                <a :href="'https://pubmed.ncbi.nlm.nih.gov/' + scope.row.pmid" target="_blank">{{ scope.row.pmid }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="experiment" label="experiment"></el-table-column>
        <el-table-column label="Detail">
            <template #default="scope">
                <a :href="'/detail?num=' + scope.row.num" target="_blank">Detail</a>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'TableViewCom',
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
