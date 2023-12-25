import OrganizationForm from "@/components/organization/organization-form";
import OrganizationHeader from "@/components/organization/organization-header";
import React from "react";

const CreateOrganizationPage = () => {
  const headerTitle = "Create your organization";
  return (
    <div className="flex flex-col space-y-9 p-3">
      <OrganizationHeader title={headerTitle} />

      <OrganizationForm />
    </div>
  );
};

export default CreateOrganizationPage;
