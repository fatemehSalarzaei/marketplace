"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import AttributeList from "./AttributeList";
import AttributeGroupList from "./AttributeGroupList";
import { useAuth } from "@/context/AuthContext";

const AttributeTabs = () => {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("attributes");

  if (!hasPermission("attribute", "read")) {
    return <p>شما دسترسی مشاهده خصوصیات را ندارید.</p>;
  }

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
          خصوصیات
        </TabsTrigger>
        {/* اگر گروه خصوصیات هم نیاز به کنترل دسترسی دارد، می‌توان مشابه این عمل کرد */}
      </TabsList>

      <TabsContent value="attributes">
        <AttributeList />
      </TabsContent>

      <TabsContent value="attribute-groups">
        {hasPermission("attribute_group", "read") ? (
          <AttributeGroupList />
        ) : (
          <p>شما دسترسی مشاهده گروه خصوصیات را ندارید.</p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AttributeTabs;
