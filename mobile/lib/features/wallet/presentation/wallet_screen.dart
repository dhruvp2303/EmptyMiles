import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../../core/theme/app_theme.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Escrow & Freight Wallet'),
        leading: IconButton(
          icon: const Icon(LucideIcons.arrowLeft),
          onPressed: () => context.pop(),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Wallet Balance Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.primaryNavy,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'WITHDRAWABLE BALANCE',
                  style: TextStyle(color: Colors.white60, fontSize: 11, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 6),
                const Text(
                  '₹7,200',
                  style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900),
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white12,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: const Row(
                        children: [
                          Icon(LucideIcons.clock, color: Colors.white70, size: 12),
                          SizedBox(width: 4),
                          Text('₹8,400 in Trip Escrow', style: TextStyle(color: Colors.white70, fontSize: 12)),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 18),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.brandAmber,
                    foregroundColor: Colors.white,
                  ),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Instant IMPS payout initiated to registered HDFC Account')),
                    );
                  },
                  icon: const Icon(LucideIcons.arrowUpRight, size: 18),
                  label: const Text('Withdraw to Bank (IMPS)'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Ledger Transactions
          const Text(
            'RECENT FREIGHT SETTLEMENTS',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 12),

          _buildTransactionTile(
            title: 'Trip Settlement: TR-8800',
            subtitle: 'Vadodara to Surat • 5.0T FMCG',
            amount: '+₹7,200',
            time: 'Yesterday, 05:45 PM',
            isCredit: true,
          ),
          const SizedBox(height: 10),
          _buildTransactionTile(
            title: 'Bank Withdrawal (IMPS)',
            subtitle: 'HDFC Bank •••• 4921',
            amount: '-₹15,000',
            time: '3 days ago',
            isCredit: false,
          ),
          const SizedBox(height: 10),
          _buildTransactionTile(
            title: 'Trip Settlement: TR-8790',
            subtitle: 'Surat to Mumbai • 6.0T Industrial',
            amount: '+₹12,600',
            time: '4 days ago',
            isCredit: true,
          ),
        ],
      ),
    );
  }

  Widget _buildTransactionTile({
    required String title,
    required String subtitle,
    required String amount,
    required String time,
    required bool isCredit,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: isCredit ? AppColors.success.withOpacity(0.1) : AppColors.error.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(
              isCredit ? LucideIcons.arrowDownLeft : LucideIcons.arrowUpRight,
              color: isCredit ? AppColors.success : AppColors.error,
              size: 18,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                const SizedBox(height: 2),
                Text(subtitle, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                const SizedBox(height: 2),
                Text(time, style: const TextStyle(color: AppColors.textMuted, fontSize: 11)),
              ],
            ),
          ),
          Text(
            amount,
            style: TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: 15,
              color: isCredit ? AppColors.success : AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}
