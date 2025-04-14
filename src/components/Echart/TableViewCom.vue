<template>
    <el-table :data="dataShowTable" style="width: 100%">
        <!-- /detail/MiRNA?mirna_id=miR-214 -->
        <el-table-column prop="mirna_id" label="miRNA">
            <template #default="scope">
                <a :href="'/detail/MiRNA?mirna_id=' + scope.row.mirna_id" target="_blank">{{ scope.row.mirna_id }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="circrna_id" label="circRNA">
            <template #default="scope">
                <a :href="'/detail/circRNA?circrna_id=' + scope.row.circrna_id" target="_blank">{{ scope.row.circrna_id }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="disease" label="disease"></el-table-column>
        <!-- <el-table-column prop="description" label="description"></el-table-column> -->
        <el-table-column prop="pmid" label="pmid">
            <template #default="scope">
                <a :href="'https://pubmed.ncbi.nlm.nih.gov/' + scope.row.pmid" target="_blank">{{ scope.row.pmid }}</a>
            </template>
        </el-table-column>
        <el-table-column prop ="circrna_id" label="link">
            <template #default="scope">
                <!-- entity=circRNAX and model=Transfuison -->
                 <!-- /tool?entity=scope.row.circrna_id&model=Transfusion -->
                <a :href="'/tool?entity=' + scope.row.circrna_id + '&model=TransFusion'"
                target="_blank">Tool Link
                </a>
                <!-- <a :href="'/tool?'+ scope.row.circrna_id" 
                target="_blank">Tool Link
                </a> -->
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
