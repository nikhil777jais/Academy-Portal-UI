import { Module } from "../module/module"

export interface ModuleSkill {
    id: number
    name: string
    family: string
    createdBy: string
    relatedModules: Module[]
}
