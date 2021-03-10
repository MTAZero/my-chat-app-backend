import { Inject, Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { ActionCodes } from 'src/const';
import { TblRuleService } from 'src/modules/database/services/tbl-rules.service';

@Injectable()
export class AuthHelperService {
    @Inject()
    ruleServices: TblRuleService;

    async canAccessAPI(
        userId: string,
        module_code: string,
        action_code: string,
    ) {
        try {
            let rule_actions = await this.ruleServices.getRuleByFiler({
                user_id: userId,
                module_code: module_code,
                action_code: action_code,
            });

            let rule_action_all = await this.ruleServices.getRuleByFiler({
                user_id: userId,
                module_code: module_code,
                action_code: ActionCodes.ALL,
            });

            let rules = [];
            if (rule_actions.length === 0) rules = rule_action_all;
            else if (rule_action_all.length === 0) rules = rule_actions;
            else {
                if (rule_actions[0].priority < rule_action_all[0].priority)
                    rules = rule_actions;
                else rules = rule_action_all;
            }

            // not have any rule
            if (rules.length === 0) return false;

            return rules[0].is_allow;
        } catch (ex) {
            return false;
        }
    }

    async canAccessResource(userId: string, resource_id: string) {
        console.log('resource_id ', resource_id);

        return false;
    }
}
