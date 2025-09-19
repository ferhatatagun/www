<script>
	import { data, title } from '@data/resume';

	import Chip from '$lib/components/Chip/Chip.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
</script>

<svelte:head>
    <title>{title}</title>
    <link rel="canonical" href={`https://ferhatatagun.com/resume`} />
    <meta name="description" content="Ferhat Atagün özgeçmişi (PDF)." />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://ferhatatagun.com/resume`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content="Ferhat Atagün özgeçmişi (PDF)." />
    <meta property="og:site_name" content="Ferhat Atagün" />
</svelte:head>

<CommonPage {title}>
	<div class="resume">
		{#if data}
			<a href={data} download>
				<Chip size={'1.25em'}>Download</Chip>
			</a>
      <div class="w-full" >
          <object data={data} type="application/pdf" aria-label="Ferhat Atagün CV [PDF]" width="100%" height="100%">
           	<a href={data} download>
              <Chip size={'1.25em'}>Download</Chip>
            </a>
          </object>
      </div>
		{:else}
			<Chip>Ooops! no CV at the moment.</Chip>
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.resume {
		display: flex;
    flex-direction: column;
		justify-content: center;
		margin-top: 20px;
		gap: 20px;

    object {
      min-height: 1200px;
    }

		& > a {
			color: inherit;
		}
	}
</style>
