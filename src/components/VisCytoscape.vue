<template>
    <div id="cy"></div>
</template>

<script>
import cytoscape from 'cytoscape';

export default {
    name: 'VisCytoscape',
    data(){
        return {
            mainRNA_id: 'mainRNA',
            linkingRNA_list: ['linkingRNA1', 'linkingRNA2', 'linkingRNA3']
        };
    },
    // props: {
    //     mainRNA_id: {
    //         type: String,
    //         required: true
    //     },
    //     linkingRNA_list: {
    //         type: Array,
    //         required: true
    //     }
    // },
    mounted() {
        this.initCytoscape();
    },
    methods: {
        initCytoscape() {
            const elements = [];

            // Add mainRNA node
            elements.push({
                data: { id: this.mainRNA_id, label: this.mainRNA_id },
                classes: 'mainRNA'
            });

            // Add linkingRNA nodes and edges
            this.linkingRNA_list.forEach(rna => {
                elements.push({
                    data: { id: rna, label: rna },
                    classes: 'linkingRNA'
                });
                // Add edge from mainRNA to linkingRNA
                elements.push({
                    data: { source: this.mainRNA_id, target: rna }
                });
            });

            cytoscape({
                container: document.getElementById('cy'),
                elements: elements,
                style: [
                    {
                        selector: 'node.mainRNA',
                        style: {
                            'shape': 'star',
                            'background-color': 'yellow',
                            'label': 'data(label)'
                        }
                    },
                    {
                        selector: 'node.linkingRNA',
                        style: {
                            'shape': 'ellipse',
                            'background-color': 'black',
                            'label': 'data(label)',
                            
                            'font-size': '12px'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 2,
                            'line-color': '#ccc'
                        }
                    }
                ],
                layout: {
                    name: 'cose'
                }
            });
        }
    }
};
</script>

<style scoped>
#cy {
    width: 70vw;
    height: 600px;
}
</style>