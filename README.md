# heyday tech challenge starter project

You can use this project as a starter for your tech challenge for heyday.

This starter project uses the [Nest](https://github.com/nestjs/nest) framework.

## Challenge description

Your task is to build a small GraphQL API.

The business domain: every employee of a company has a certain budget to spend on vouchers from partners every month. If the spending of an employee in a certain month is higher than 44€, the employee has to “pay” 30% taxes from his or her net salary on the surplus amount which means that the tax advisor needs to account for it. (Background: in Germany, up to 44€ can be given tax free to an employee in forms of employee benefits ([Sachbezug](https://en.wikipedia.org/wiki/Employee_benefits)). There are other possible tax deductions in Germany as well, but they are not part of this challenge, but should be kept in mind when doing the code architecture)

The API should be able to answer the following three requests (note: It’s not a deal breaker if you are not able to implement all three requests):

- List all employees grouped by company that have more than 10€ in benefits left to spend this month. This query should be flexible in such a way that you can provide a past month as an argument as well.
- A list of employees from a single company with their spending in a certain month. It should list the money per employee that was spent up to 44€ as tax free and the money above this threshold should be split up by net salary and taxes. There should also be a total per employee.
- List the revenue per partner.

Our challenge for you is to write the application based on NestJS and it should include the GraphQL Playground. You are free in your choice of other used packages.

The example data can be found in the [`data`](data) folder.

The deliverables are the code as well as one example GraphQL query for each of the requests. When you are done, please send us the code via email (either zipped or as a link to a repository on Github/Gitlab/...). If you get stuck, have questions or do not find the time to complete the challenge, please do not hesitate to reach out.

## Installation

```bash
npm i
```

## Running the app

```bash
# Development
npm start

```

## Tests

```bash
# Unit tests
npm run test

```

## GraphQL

The GraphQL playground is available at http://localhost:3000/graphql

### Queries

#### Sample Queries

```graphql

--- List all employees grouped by company that have more than 10€ in benefits left to spend this month. This query should be flexible in such a way that you can provide a past month as an argument as well.
----
query{
  employees_with_more_than_10(date:"2020-02-01"){
    companyName
    employees{
      id
      name
      budgetRemaining
    }
  }
}

--- A list of employees from a single company with their spending in a certain month. It should list the money per employee that was spent up to 44€ as tax free and the money above this threshold should be split up by net salary and taxes. There should also be a total per employee.
----

query{
  employee_spend_for_company(date:"2020-02-01",companyId:2){
   employeeName
    taxFree
    netSalary
    taxes
    totalSpent
  }
}


---- Revenue per patner ----

List the revenue per partner.

query{
  revenue_per_partner{
    patnerName
    revenue
  }
}

```
