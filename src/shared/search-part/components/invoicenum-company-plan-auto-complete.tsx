import { Grid, MultiSelectProps } from "@mantine/core";
import React, { useState } from "react";
import AsyncMultiSelect from "./async-multi-select";
import { useCompanies } from "@/shared/hooks/use-companies";
import useInvoices from "@/shared/hooks/use-invoices";
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

  const { companies, isLoading } = useCompanies({ searchCompany });
  const { plans, loading } = usePlans({ searchPlan });
  const { invoiceNumber, isLoadingInvoiceNum } = useInvoices({
    searchInvoiceNum,
  });
  console.log("invoiceNumber", invoiceNumber);

  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label="شماره فاکتور رسمی"
          inputProps={invoiceNumProp}
          data={invoiceNumber}
          isLoading={isLoadingInvoiceNum}
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
          isLoading={loading}
          searchItem={searchPlan}
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
          isLoading={isLoading}
          selectedItem={selectedCompany}
          setSelectedItem={setSelectedCompany}
          searchItem={searchCompany}
          setSearchItem={setSearchCompany}
        />
      </Grid.Col>
    </>
  );
}
