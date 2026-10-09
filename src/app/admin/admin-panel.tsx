"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import type { SiteAsset } from "@/lib/site-assets";

type AdminProduct = Product & { sort_order: number };
type AdminSiteAsset = SiteAsset & { sort_order: number };

export default function AdminPanel({ configured }: { configured: boolean }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [siteAssets, setSiteAssets] = useState<AdminSiteAsset[]>([]);
  const [password, setPassword] = useState("");
  const [selectedImages, setSelectedImages] = useState<Record<string, File | undefined>>({});
  const [selectedSiteImages, setSelectedSiteImages] = useState<Record<string, File | undefined>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<"login" | "save" | "image" | "site-image" | "logout" | null>(null);
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);
  const [siteAssetsMessage, setSiteAssetsMessage] = useState("");

  const loadProducts = useCallback(async () => {
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    if (response.status === 401) return false;

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Não foi possível carregar o painel.");
    setProducts(result);

    const assetsResponse = await fetch("/api/admin/site-assets", { cache: "no-store" });
    const assetsResult = await assetsResponse.json();
    if (assetsResponse.ok && Array.isArray(assetsResult)) {
      setSiteAssets(assetsResult);
      setSiteAssetsMessage("");
    } else {
      setSiteAssets([]);
      setSiteAssetsMessage(
        assetsResult.error || "Não foi possível carregar as fotos das outras seções.",
      );
    }

    setAuthenticated(true);
    return true;
  }, []);

  useEffect(() => {
    if (!configured) return;
    loadProducts().catch((error: unknown) => {
      setMessage(error instanceof Error ? error.message : "Não foi possível carregar o painel.");
      setMessageIsError(true);
    });
  }, [configured, loadProducts]);

  function showMessage(text: string, isError = false) {
    setMessage(text);
    setMessageIsError(isError);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusyAction("login");
    setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível entrar.");
      setPassword("");
      await loadProducts();
      showMessage("Acesso liberado.");
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Não foi possível entrar.", true);
    } finally {
      setBusyAction(null);
    }
  }

  async function saveProduct(product: AdminProduct) {
    setBusyId(product.id);
    setBusyAction("save");
    try {
      const response = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          name: product.name,
          description: product.description,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível salvar.");
      setProducts((current) => current.map((item) => (item.id === product.id ? {
        ...item,
        name: result.name,
        description: result.description || "",
      } : item)));
      showMessage(`${product.name} salvo.`);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Não foi possível salvar.", true);
    } finally {
      setBusyId(null);
      setBusyAction(null);
    }
  }

  async function uploadImage(product: AdminProduct) {
    const image = selectedImages[product.id];
    if (!image) {
      showMessage("Escolha uma foto primeiro.", true);
      return;
    }

    setBusyId(product.id);
    setBusyAction("image");
    try {
      const form = new FormData();
      form.set("id", product.id);
      form.set("image", image);
      const response = await fetch("/api/admin/products/image", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível enviar a foto.");
      setProducts((current) => current.map((item) => (item.id === product.id ? {
        ...item,
        image: result.image_url,
      } : item)));
      setSelectedImages((current) => ({ ...current, [product.id]: undefined }));
      showMessage(`Foto de ${product.name} atualizada.`);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Não foi possível enviar a foto.", true);
    } finally {
      setBusyId(null);
      setBusyAction(null);
    }
  }

  async function uploadSiteImage(asset: AdminSiteAsset) {
    const image = selectedSiteImages[asset.id];
    if (!image) {
      showMessage("Escolha uma foto primeiro.", true);
      return;
    }

    const busyKey = `site-${asset.id}`;
    setBusyId(busyKey);
    setBusyAction("site-image");
    try {
      const form = new FormData();
      form.set("id", asset.id);
      form.set("image", image);
      const response = await fetch("/api/admin/site-assets/image", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível enviar a foto.");
      setSiteAssets((current) => current.map((item) =>
        item.id === asset.id ? { ...item, image: result.image_url } : item,
      ));
      setSelectedSiteImages((current) => ({ ...current, [asset.id]: undefined }));
      showMessage(`Foto atualizada: ${asset.label}.`);
    } catch (error) {
      showMessage(error instanceof Error ? error.message : "Não foi possível enviar a foto.", true);
    } finally {
      setBusyId(null);
      setBusyAction(null);
    }
  }

  async function logout() {
    setBusyAction("logout");
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthenticated(false);
    setProducts([]);
    setSiteAssets([]);
    setBusyAction(null);
    showMessage("Você saiu do painel.");
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] px-4 py-8 text-[#34422d] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#788268]">Merena Beachwear</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Painel dos modelos</h1>
            <p className="mt-2 text-sm text-[#687060]">Edite as fotos, os nomes e as descrições que aparecem no site.</p>
          </div>
          {authenticated && (
            <button
              type="button"
              onClick={logout}
              disabled={busyAction === "logout"}
              className="rounded-full border border-[#556149]/20 px-4 py-2 text-sm font-medium hover:bg-white/60 disabled:opacity-60"
            >
              Sair
            </button>
          )}
        </header>

        {message && (
          <p role="status" className={`mb-5 rounded-xl px-4 py-3 text-sm ${messageIsError ? "bg-red-50 text-red-800" : "bg-white/70 text-[#4f5f43]"}`}>
            {message}
          </p>
        )}

        {!configured ? (
          <section className="max-w-xl rounded-2xl border border-[#556149]/10 bg-white/70 p-5 shadow-sm sm:p-7">
            <h2 className="text-lg font-semibold">Painel criado; falta ativar o acesso</h2>
            <p className="mt-2 text-sm leading-6 text-[#687060]">
              Para salvar fotos e descrições no site publicado, conecte o Supabase e defina a senha do painel nas configurações da Vercel. O passo a passo está no arquivo <strong>ADMIN_SETUP.md</strong> do projeto.
            </p>
          </section>
        ) : !authenticated ? (
          <form onSubmit={login} className="max-w-md rounded-2xl border border-[#556149]/10 bg-white/70 p-5 shadow-sm sm:p-7">
            <label htmlFor="admin-password" className="block text-sm font-semibold">Senha de acesso</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#556149]/20 bg-white px-4 py-3 outline-none focus:border-[#4f5f43]"
            />
            <button
              type="submit"
              disabled={busyAction === "login"}
              className="mt-4 w-full rounded-xl bg-[#4f5f43] px-4 py-3 font-semibold text-white hover:bg-[#34422d] disabled:opacity-60"
            >
              {busyAction === "login" ? "Entrando…" : "Entrar no painel"}
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <section className="rounded-2xl border border-[#556149]/10 bg-white/70 p-4 shadow-sm sm:p-5">
              <h2 className="text-xl font-semibold">Fotos do site</h2>
              <p className="mt-1 text-sm leading-6 text-[#687060]">
                Troque as fotos do cabeçalho, do logo e da vitrine. O cabeçalho também é usado na seção Sobre a Merena.
              </p>
            </section>

            {siteAssetsMessage && (
              <p role="status" className="rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                {siteAssetsMessage}
              </p>
            )}

            {siteAssets.map((asset) => (
              <section key={asset.id} className="grid gap-5 rounded-2xl border border-[#556149]/10 bg-white/70 p-4 shadow-sm sm:grid-cols-[150px_1fr] sm:p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#ded7c9] sm:aspect-auto sm:min-h-[190px]">
                  <Image src={asset.image} alt={asset.alt} fill sizes="150px" className="object-cover" unoptimized />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold">{asset.label}</h3>
                    <p className="mt-1 text-sm leading-5 text-[#687060]">{asset.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold" htmlFor={`site-image-${asset.id}`}>Trocar foto</label>
                    <input
                      id={`site-image-${asset.id}`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) => setSelectedSiteImages((current) => ({ ...current, [asset.id]: event.target.files?.[0] }))}
                      className="mt-1.5 block w-full text-sm text-[#687060] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e9e8df] file:px-3 file:py-2 file:font-medium file:text-[#34422d]"
                    />
                    <p className="mt-1 text-xs leading-5 text-[#788268]">
                      {asset.recommendation} JPG, PNG ou WebP, até 5 MB. Ajuste a imagem antes de enviar; o site pode cortá-la para encaixar.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => uploadSiteImage(asset)}
                    disabled={busyId === `site-${asset.id}` || !selectedSiteImages[asset.id]}
                    className="rounded-xl border border-[#556149]/20 px-4 py-2.5 text-sm font-semibold text-[#34422d] hover:bg-[#f4efe5] disabled:opacity-50"
                  >
                    {busyId === `site-${asset.id}` && busyAction === "site-image" ? "Enviando…" : "Enviar foto"}
                  </button>
                </div>
              </section>
            ))}

            <section className="rounded-2xl border border-[#556149]/10 bg-white/70 p-4 shadow-sm sm:p-5">
              <h2 className="text-xl font-semibold">Fotos dos biquínis</h2>
              <p className="mt-1 text-sm leading-6 text-[#687060]">
                Edite o nome, a descrição e a foto de cada modelo exibido no carrossel.
              </p>
            </section>

            {products.map((product) => (
              <section key={product.id} className="grid gap-5 rounded-2xl border border-[#556149]/10 bg-white/70 p-4 shadow-sm sm:grid-cols-[150px_1fr] sm:p-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#ded7c9] sm:aspect-auto sm:min-h-[190px]">
                  <Image src={product.image} alt={product.alt} fill sizes="150px" className="object-cover" unoptimized />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-semibold">
                    Nome do modelo
                    <input
                      maxLength={60}
                      value={product.name}
                      onChange={(event) => setProducts((current) => current.map((item) => item.id === product.id ? { ...item, name: event.target.value } : item))}
                      className="mt-1.5 w-full rounded-xl border border-[#556149]/20 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#4f5f43]"
                    />
                  </label>
                  <label className="block text-sm font-semibold">
                    Descrição
                    <textarea
                      maxLength={240}
                      rows={3}
                      value={product.description}
                      onChange={(event) => setProducts((current) => current.map((item) => item.id === product.id ? { ...item, description: event.target.value } : item))}
                      placeholder="Escreva uma descrição curta para este modelo"
                      className="mt-1.5 w-full resize-y rounded-xl border border-[#556149]/20 bg-white px-3 py-2.5 font-normal outline-none focus:border-[#4f5f43]"
                    />
                    <span className="mt-1 block text-right text-xs font-normal text-[#788268]">{product.description.length}/240</span>
                  </label>
                  <div>
                    <label className="block text-sm font-semibold" htmlFor={`image-${product.id}`}>Trocar foto</label>
                    <input
                      id={`image-${product.id}`}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) => setSelectedImages((current) => ({ ...current, [product.id]: event.target.files?.[0] }))}
                      className="mt-1.5 block w-full text-sm text-[#687060] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e9e8df] file:px-3 file:py-2 file:font-medium file:text-[#34422d]"
                    />
                    <p className="mt-1 text-xs leading-5 text-[#788268]">
                      Antes de enviar, ajuste a foto para o formato vertical 4:5 (ideal: 1080 × 1350 px).
                      O site corta a imagem para esse formato. JPG, PNG ou WebP, até 5 MB.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => saveProduct(product)}
                      disabled={busyId === product.id}
                      className="rounded-xl bg-[#4f5f43] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#34422d] disabled:opacity-60"
                    >
                      {busyId === product.id && busyAction === "save" ? "Salvando…" : "Salvar nome e descrição"}
                    </button>
                    <button
                      type="button"
                      onClick={() => uploadImage(product)}
                      disabled={busyId === product.id || !selectedImages[product.id]}
                      className="rounded-xl border border-[#556149]/20 px-4 py-2.5 text-sm font-semibold text-[#34422d] hover:bg-[#f4efe5] disabled:opacity-50"
                    >
                      {busyId === product.id && busyAction === "image" ? "Enviando…" : "Enviar foto"}
                    </button>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
