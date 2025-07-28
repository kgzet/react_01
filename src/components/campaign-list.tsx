import { Campaign, CampaignStatus } from "../data/sample-data";

interface CampaignListProps {
  campaigns: Campaign[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CampaignList({
  campaigns,
  onEdit,
  onDelete,
}: CampaignListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Nazwa</th>
            <th className="px-4 py-2">Słowa kluczowe</th>
            <th className="px-4 py-2">Stawka</th>
            <th className="px-4 py-2">Fundusz</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Miasto</th>
            <th className="px-4 py-2">Promień (km)</th>
            <th className="px-4 py-2">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.keywords.join(", ")}</td>
              <td className="px-4 py-2">{c.bid}</td>
              <td className="px-4 py-2">{c.fund}</td>
              <td className="px-4 py-2">
                <span
                  className={
                    c.status === CampaignStatus.ON
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {c.status === CampaignStatus.ON ? "Włączona" : "Wyłączona"}
                </span>
              </td>
              <td className="px-4 py-2">{c.town}</td>
              <td className="px-4 py-2">{c.radius}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => onEdit(c.id)}
                >
                  Edytuj
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => onDelete(c.id)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
