"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetCurLADSUResidencesQuery,
  useGetTenantQuery,
} from "@/state/api";
import React from "react";

const Residences = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: curLADSUResidences,
    isLoading,
    error,
  } = useGetCurLADSUResidencesQuery(authUser?.cognitoInfo?.userId || "", {
    skip: !authUser?.cognitoInfo?.userId,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading curLADSU residences</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="CurLADSU Residences"
        subtitle="View and manage your curLADSU living spaces"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {curLADSUResidences?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={tenant?.favorites.includes(property.id) || false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!curLADSUResidences || curLADSUResidences.length === 0) && (
        <p>You don&lsquo;t have any curLADSU residences</p>
      )}
    </div>
  );
};

export default Residences;
