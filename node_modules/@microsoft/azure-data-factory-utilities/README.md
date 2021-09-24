# Azure Data Factory utilities

This library provides basic functionality to validate and generate an ARM template given a set of Data Factory resources.

## Export ARM template

Run `npm run start export <rootFolder> <factoryId> [outputFolder]` to export the ARM template using the resources of a given folder.

Example: `npm run start export C:\DataFactories\DevDataFactory /subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/testResourceGroup/providers/Microsoft.DataFactory/factories/DevDataFactory ArmTemplateOutput`

- RootFolder is a mandatory field that represents where the Data Factory resources are located.
- FactoryId is a mandatory field that represents the Data factory resoruce id in the format: `/subscriptions/<subId>/resourceGroups/<rgName>/providers/Microsoft.DataFactory/factories/<dfName>`
- OutputFolder is an optional parameter that specifies the relative path to save the generated ARM template.

## Validate

Run `npm run start validate <rootFolder> <factoryId>` to validate all the resources of a given folder.

Example: `npm run start validate C:\DataFactories\DevDataFactory /subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/testResourceGroup/providers/Microsoft.DataFactory/factories/DevDataFactory`

- RootFolder is a mandatory field that represents where the Data Factory resources are located.
- FactoryId is a mandatory field that represents the Data factory resoruce id in the format: `/subscriptions/<subId>/resourceGroups/<rgName>/providers/Microsoft.DataFactory/factories/<dfName>`
