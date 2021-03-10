import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './core/chat.gateway';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DatabaseModule } from './modules/database/database.module';
import { ManagerUsersController } from './modules/manager-users/manager-users.controller';
import { ManagerUsersModule } from './modules/manager-users/manager-users.module';
import { UploadController } from './modules/upload/upload.controller';
import { UploadModule } from './modules/upload/upload.module';
import { ManagerMessagesModule } from './modules/manager-messages/manager-messages.module';
import { ManagerResourcesModule } from './modules/manager-resources/manager-resources.module';
import { ManagerRulesModule } from './modules/manager-rules/manager-rules.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://mtazero:123edcxz@cluster0.aofke.mongodb.net/chat_application_db?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
        ),
        AuthenticationModule,
        DatabaseModule,
        ManagerUsersModule,
        UploadModule,
        ManagerMessagesModule,
        ManagerResourcesModule,
        ManagerRulesModule,
    ],
    providers: [ChatGateway]
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                // UploadController,
                // ManagerUsersController
                "/"
            )
    }
}
