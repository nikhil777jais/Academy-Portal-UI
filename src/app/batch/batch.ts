export interface Batch {
    id?: number;
    relatedSkillId: number;
    relatedModuleId: number;
    technology: string;
    batch_Start_Date: string;
    batch_End_Date: string;
    batch_Capacity: number;
    classroom_Name: string;
    createdBy: string;
}
