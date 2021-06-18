// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
import { AppState } from 'src/models/app'
import { WorkflowState } from 'src/models/workflow'

interface Root {
    app: AppState
    workflow: WorkflowState
} 

export as namespace store