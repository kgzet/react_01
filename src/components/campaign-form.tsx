import { useState } from "react";
import { Campaign, CampaignStatus } from "../data/sample-data";
import { towns } from "@/data/towns";
import { keywords } from "@/data/keywords";

interface CampaignFormProps {
  initial?: Partial<Campaign>;
  onSave: (campaign: Omit<Campaign, "id">) => void;
  onCancel: () => void;
  minBid?: number;
  emeraldBalance: number;
}

export default function CampaignForm({
  initial = {},
  onSave,
  onCancel,
  minBid = 1,
  emeraldBalance,
}: CampaignFormProps) {
  const [name, setName] = useState(initial.name || "");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    initial.keywords || []
  );
  const [bid, setBid] = useState(initial.bid || minBid);
  const [fund, setFund] = useState(initial.fund || 0);
  const [status, setStatus] = useState(initial.status ?? CampaignStatus.ON);
  const [town, setTown] = useState(initial.town || towns[0]);
  const [radius, setRadius] = useState(initial.radius || 1);
  const [keywordInput, setKeywordInput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const availableKeywords = keywords.filter(
    (k) => !selectedKeywords.includes(k) && k.includes(keywordInput)
  );

  function validate() {
    const errs = [];
    if (!name.trim()) {
      errs.push("Nazwa kampanii jest wymagana.");
    }
    if (selectedKeywords.length === 0) {
      errs.push("Wybierz przynajmniej jedno słowo kluczowe.");
    }
    if (!bid || bid < minBid) {
      errs.push(`Minimalna stawka to ${minBid}.`);
    }
    if (!fund || fund < 1) {
      errs.push("Fundusz kampanii jest wymagany.");
    }
    if (fund > emeraldBalance) {
      errs.push("Brak wystarczających środków na koncie Emerald.");
    }
    if (!town) {
      errs.push("Wybierz miasto.");
    }
    if (!radius || radius < 1) {
      errs.push("Podaj promień w kilometrach.");
    }
    setErrors(errs);
    return errs.length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      name,
      keywords: selectedKeywords,
      bid,
      fund,
      status,
      town,
      radius,
    });
  }

  function addKeyword(k: string) {
    setSelectedKeywords([...selectedKeywords, k]);
    setKeywordInput("");
  }

  function removeKeyword(k: string) {
    setSelectedKeywords(selectedKeywords.filter((kw) => kw !== k));
  }

  return (
    <form
      className="space-y-4 bg-white p-4 rounded shadow"
      onSubmit={handleSubmit}
    >
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-2 rounded">
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
      <div>
        <label className="block font-semibold">Nazwa kampanii *</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Słowa kluczowe *</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedKeywords.map((k) => (
            <span
              key={k}
              className="bg-blue-100 px-2 py-1 rounded flex items-center"
            >
              {k}
              <button
                type="button"
                className="ml-1 text-red-500"
                onClick={() => removeKeyword(k)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          className="border rounded px-2 py-1 w-full"
          placeholder="Wpisz słowo kluczowe"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
        />
        {keywordInput && (
          <div className="bg-gray-100 border rounded mt-1">
            {availableKeywords.map((k) => (
              <div
                key={k}
                className="px-2 py-1 cursor-pointer hover:bg-blue-200"
                onClick={() => addKeyword(k)}
              >
                {k}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <label className="block font-semibold">Stawka (min. {minBid}) *</label>
        <input
          type="number"
          min={minBid}
          className="border rounded px-2 py-1 w-full"
          value={bid}
          onChange={(e) => setBid(Number(e.target.value))}
        />
      </div>
      <div>
        <label className="block font-semibold">Fundusz kampanii *</label>
        <input
          type="number"
          min={1}
          className="border rounded px-2 py-1 w-full"
          value={fund}
          onChange={(e) => setFund(Number(e.target.value))}
        />
        <div className="text-sm text-gray-500">
          Dostępne środki: {emeraldBalance}
        </div>
      </div>
      <div>
        <label className="block font-semibold">Status *</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value as CampaignStatus)}
        >
          <option value={CampaignStatus.ON}>Włączona</option>
          <option value={CampaignStatus.OFF}>Wyłączona</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Miasto *</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={town}
          onChange={(e) => setTown(e.target.value)}
        >
          {towns.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold">Promień (km) *</label>
        <input
          type="number"
          min={1}
          className="border rounded px-2 py-1 w-full"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Zapisz
        </button>
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onCancel}
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
