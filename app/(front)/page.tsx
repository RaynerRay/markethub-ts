
import React from "react";
import { getCategories } from "@/actions/categories";
import Hero from "@/components/Frontend/Hero";
import PropertyListing from "@/components/Frontend/Home/PropertyListing";
import PropertyTypes from "@/components/Frontend/Home/PropertyTypes";
import LogoClouds from "@/components/Frontend/LogoClouds";
import HomeServices from "@/components/Frontend/Home/HomeServices";

export default async function Home() {
  const categories = (await getCategories()).data || [];

  return (
    <main>
      <Hero />
      <LogoClouds />
      <PropertyListing />
      <PropertyTypes categories={categories} />
      <HomeServices />
    </main>
  );
}
