<template>
    <el-header>
        <TopNavBar :curId="-1" />
    </el-header>
    <el-container>
        <el-main>
            <el-card class="box-card">
  
                <el-form label-position="top">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="Num">
                                <el-input v-model="data.num" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Circrna ID">
                                <el-input v-model="data.circrna_id" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Mirna ID">
                                <el-input v-model="data.mirna_id" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- 继续添加其他字段 -->
                        <el-col :span="8">
                            <el-form-item label="Organism">
                                <el-input v-model="data.organism" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- ... -->
                        <el-col :span="8">
                            <el-form-item label="Disease">
                                <el-input v-model="data.disease" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="mRNA">
                                <el-input v-model="data.mrna" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Gene">
                                <el-input v-model="data.gene" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Virus Name">
                                <el-input v-model="data.virus_name" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Tissue Cells">
                                <el-input v-model="data.tissue_cells" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Experiment">
                                <el-input v-model="data.experiment" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <!--         <el-table-column prop="pmid" label="pmid">
                                    <template #default="scope">
                                        <a :href="'https://pubmed.ncbi.nlm.nih.gov/' + scope.row.pmid" target="_blank">{{ scope.row.pmid }}</a>
                                    </template>
                                </el-table-column>
         -->
                            <el-form-item label="PMID">
                                <div>
                                    <el-button type="primary" @click="getclipboard(data.pmid)">Copy</el-button>
                                </div>
                                <el-input v-model="data.pmid"  readonly></el-input>
                                
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="Description">
                                <el-input type="textarea" v-model="data.description" rows="5" readonly>

                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-button type="primary" @click="getGoPM">Go to PubMed</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="success" @click="getGoCircBase">Go to CircBank</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" @click="getGoMirBase">Go to MirBase</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
import TopNavBar from './TopNavBar.vue';
import axios from 'axios';

export default {
    components: {
        TopNavBar
    },
    data() {
        return {
            data: {}
        };
    },
    created() {
        const num = this.$route.query.num;
        this.fetchData(num);
    },
    methods: {
        fetchData(num) {
            console.log('Fetching data for num:', num);
            axios.get(`/api/get_by_num.php?num=${num}`)
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        getGoPM() {
            
            window.open('https://pubmed.ncbi.nlm.nih.gov/' + this.data.pmid);
      
        },
        getGoCircBase() {

            // 向用户粘贴板写入当前数据
            // navigator.clipboard.writeText(this.data.circrna_id);
            window.open("https://www.ncbi.nlm.nih.gov/geo/")
           
            
        },
        getclipboard(text ){
            navigator.clipboard.writeText(text);
        } ,
        getGoMirBase() {
                // https://www.mirbase.org/results/?query=miR-148a-3p
            window.open('https://www.mirbase.org' );

        }

    }
};
</script>

<style scoped>
    /* 让所有的字体都居中显 */
    .el-form-item__label {
        text-align: center;
    }
    .box-card {
        width: 100%;
        margin-top: 20px;
    }
    .el-form-item {
        margin-bottom: 20px;
    }
    .el-input {
        width: 100%;
        text-align: center;
    }

</style>