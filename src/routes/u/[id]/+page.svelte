<script>
  import { page } from '$app/stores'
  import { onMount } from 'svelte';

  import "$lib/links.scss";

  import { IconLink, IconMail, IconBrandLinkedin, IconDeviceDesktop, IconPhone, IconBrandInstagram, IconBrandTiktok, IconBrandX, IconMusic, IconDeviceMobile } from '@tabler/icons-svelte';

  let data;

  onMount(async () => {
    const response = await fetch(`../api/get_links?id=${$page.params.id}`)
    data = await response.json()
    console.log(data)
  })
</script>

<main class="links-main">
  <header>
    <h1 class="title">
      <div class="top">
        <img src={data ? data.avatar : "//unsplash.it/500"} alt="Headshot" class="avatar">
        <span class="top-text">{data ? data.first_name : "Loading"}</span>
      </div>
      <span class="bottom">{data ? data.last_name : "Loading"}</span>
    </h1>
    <p>{data ? data.tagline : "Loading..."}</p>
  </header>
  <div class="main-links">
    {#if data}
      {#each data.links_list as link}
        <a href={link.url}>
          {#if link.icon == "Email"}
            <IconMail/>
          {:else if link.icon == "Phone"}
            <IconPhone/>
          {:else if link.icon == "Computer"}
            <IconDeviceDesktop/>
          {:else if link.icon == "Mobile Phone"}
            <IconDeviceMobile/>
          {:else if link.icon == "Music"}
            <IconMusic/>
          {:else if link.icon == "LinkedIn"}
            <IconBrandLinkedin/>
          {:else if link.icon == "Instagram"}
            <IconBrandInstagram/>
          {:else if link.icon == "Twitter/X"}
            <IconBrandX/>
          {:else if link.icon == "TikTok"}
            <IconBrandTiktok/>
          {:else}
            <IconLink/>
          {/if}
          {link.title}
        </a>
      {/each}
    {/if}
  </div>
</main>