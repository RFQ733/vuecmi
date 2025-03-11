1. miRNA endpoint:
   GET /api/miRNA/{id}
   Response:
   {
   "mirna_id": string,
   "name": string,
   "sequence": string,
   "targets": [string],
   "related_circRNAs": [string],
   "related_diseases": [string]
   }
2. 
3. Disease endpoint:

   GET /api/disease/{id}
   Response:
   {
   "disease_id": string,
   "name": string,
   "description": string,
   "related_miRNAs": [string],
   "related_circRNAs": [string],
   "treatments": [string]
   }
