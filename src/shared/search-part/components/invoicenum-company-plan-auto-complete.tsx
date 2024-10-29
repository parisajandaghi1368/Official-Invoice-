import { Grid, MultiSelectProps } from "@mantine/core";
import React, { useState } from "react";
import AsyncMultiSelect from "./async-multi-select";
import { useCompanies } from "@/shared/hooks/use-companies";
import useInvoiceNumbers from "@/shared/hooks/use-invoice-num";
import usePlans from "@/shared/hooks/use-plan";
interface AutoCompleteProps {
  invoiceNumProp: MultiSelectProps;
  companyNameProp: MultiSelectProps;
  planNameProp: MultiSelectProps;
}
export default function InvoiceNumAndCompanyAutoComplete({
  invoiceNumProp,
  companyNameProp,
  planNameProp,
}: AutoCompleteProps) {
  const [searchCompany, setSearchCompany] = useState("");
  const [searchInvoiceNum, setSearchInvoiceNum] = useState("");
  const [searchPlan, setSearchPlan] = useState("");

  const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
  const [selectedInvoiceNum, setSelectedInvoiceNum] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);

  const { companies, companyLoading } = useCompanies({ searchCompany });
  const { plans, planLoading } = usePlans({ searchPlan });
  const { invoiceNumbers, invoiceNumLoading } = useInvoiceNumbers({
    searchInvoiceNum,
  });
  console.log("invoiceNumber", invoiceNumbers);

  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label="شماره فاکتور رسمی"
          inputProps={invoiceNumProp}
          data={invoiceNumbers}
          isLoading={invoiceNumLoading}
          maxValue={2}
          searchItem={searchInvoiceNum}
          setSearchItem={setSearchInvoiceNum}
          selectedItem={selectedInvoiceNum}
          setSelectedItem={setSelectedInvoiceNum}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label="نوع پلن"
          inputProps={companyNameProp}
          data={plans}
          isLoading={planLoading}
          searchItem={searchPlan}
          maxValue={2}
          setSearchItem={setSearchPlan}
          selectedItem={selectedPlan}
          setSelectedItem={setSelectedPlan}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label="نام سازمان"
          inputProps={planNameProp}
          data={companies}
          isLoading={companyLoading}
          maxValue={2}
          selectedItem={selectedCompany}
          setSelectedItem={setSelectedCompany}
          searchItem={searchCompany}
          setSearchItem={setSearchCompany}
        />
      </Grid.Col>
    </>
  );
}
