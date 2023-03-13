export interface DetailedBatch {
    id: number
    technology: string
    batch_Start_Date: string
    batch_End_Date: string
    batch_Capacity: number
    classroom_Name: string
    relatedModule: RelatedModule
    relatedSkill: RelatedSkill
    createdBy: string
    users?: UserData[]
}

export interface UserData {
    id: string
    email: string
    status: string
}
export interface RelatedModule {
    id: number
    name: string
}

export interface RelatedSkill {
    id: number
    name: string
}