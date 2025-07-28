"use client";

import { useState } from "react";
import { Campaign, mockCampaigns } from "../data/sample-data";
import CampaignList from "../components/campaign-list";
import CampaignForm from "../components/campaign-form";
import MainContainer from "@/ui/container";
import FuncButton from "@/ui/button-with-func";

export default function HomePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [emeraldBalance, setEmeraldBalance] = useState(500);

  const handleAdd = () => {
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) setEmeraldBalance((b) => b + campaign.fund);
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const handleSave = (data: Omit<Campaign, "id">) => {
    if (editingId) {
      setCampaigns(
        campaigns.map((c) => (c.id === editingId ? { ...c, ...data } : c))
      );
    } else {
      setCampaigns([
        ...campaigns,
        { ...data, id: Math.random().toString(36).slice(2) },
      ]);
    }
    setEmeraldBalance((b) => b - data.fund);
    setShowForm(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const editingCampaign = editingId
    ? campaigns.find((c) => c.id === editingId)
    : undefined;

  return (
    <main className="max-w-4xl mx-auto py-8 px-2">
      <MainContainer
        title={"Kampanie sprzedażowe"}
        subtitle={"Środki na koncie Emerald: "}
        emeraldBalance={emeraldBalance}
        buttonAdd={
          <FuncButton
            buttonName={"Dodaj kampanię"}
            buttonFunc={handleAdd}
          ></FuncButton>
        }
      >
        {showForm ? (
          <CampaignForm
            initial={editingCampaign}
            onSave={handleSave}
            onCancel={handleCancel}
            emeraldBalance={emeraldBalance}
          />
        ) : (
          <CampaignList
            campaigns={campaigns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </MainContainer>
    </main>
  );
}
