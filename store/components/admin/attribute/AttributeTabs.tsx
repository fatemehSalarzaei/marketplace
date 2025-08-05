"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import AttributeList from "./AttributeList";
import AttributeGroupList from "./AttributeGroupList";

const AttributeTabs = () => {
  const [activeTab, setActiveTab] = useState("attributes");

  return (
    <Tabs
      dir="rtl"
      value={activeTab}
      onValueChange={(val) => setActiveTab(val)}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger
          value="attributes"
          className={activeTab === "attributes" ? "text-white" : ""}
        >
          {/* خصوصیات */}
        </TabsTrigger>
        {/* <TabsTrigger
          value="attribute-groups"
          className={activeTab === "attribute-groups" ? "bg-blue-600 text-white" : ""}
        >
          گروه خصوصیات
        </TabsTrigger> */}
      </TabsList>

      <TabsContent value="attributes">
        <AttributeList />
      </TabsContent>

      <TabsContent value="attribute-groups">
        <AttributeGroupList />
      </TabsContent>
    </Tabs>
  );
};

export default AttributeTabs;
